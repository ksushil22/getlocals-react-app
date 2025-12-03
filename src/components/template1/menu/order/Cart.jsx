import React, {memo, useEffect, useState} from "react";
import {
    CartItemCard,
    CartListContainer, ItemImage, ItemInfo, NoMarginP,
    OrderButton, Quantity,
    SectionCard,
    StyledForm,
    StyledFormItem,
    StyledInput, TotalItemsCard
} from "./CartComponents";
import {Divider, Form, notification} from "antd";
import {calculatePlatformFee, calculateTax, getImageUrl, roundTo2} from "../../../util/Commons";
import {EmptyCart} from "./EmptyCartGIF";
import {DollarOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import GetAnimation from "../../../util/GetAnimation";
import {usePlaceOrderMutation} from "../../../../redux/services/orderAPI";
import {useRouter} from "next/navigation";

const UserInfoForm = ({form, loading, onFinish}) => {
    const rules = [{required: true, message: ''}];

    return (
        <StyledForm form={form} layout="vertical" onFinish={onFinish}>
            <StyledFormItem name="name" rules={rules} validateTrigger="onBlur">
                <StyledInput placeholder="Full Name (required)"/>
            </StyledFormItem>

            <StyledFormItem name="phoneNo" rules={rules} validateTrigger="onBlur">
                <StyledInput inputMode="numeric" pattern="[0-9]*" placeholder="Phone Number (required)"/>
            </StyledFormItem>

            <StyledFormItem name="email" validateTrigger="onBlur">
                <StyledInput type="email" placeholder="Email Address"/>
            </StyledFormItem>

            <StyledFormItem name={"additionalInstructions"}>
                <StyledInput placeholder="Additional Instructions"/>
            </StyledFormItem>

            <Form.Item>
                <OrderButton loading={loading} htmlType="submit">
                    Order
                </OrderButton>
            </Form.Item>
        </StyledForm>
    );
};

// ====================== Main Cart ======================

const CartList = memo(({cart, businessId}) => {
    const cartEntries = Object.values(cart);
    const [total, setTotal] = useState(0);
    const [taxedAmount, setTaxedAmount] = useState(0);
    const [platformFee, setPlatformFee] = useState(0);
    const [form] = Form.useForm();
    const [placeOrder, {isLoading: placingOrder}] = usePlaceOrderMutation()
    const router = useRouter();

    useEffect(() => {
        let sum = 0;
        cartEntries.forEach((item) => {
            sum += item.object.price * item.count;
        });
        setTotal(sum);
        setTaxedAmount(calculateTax(sum));
        setPlatformFee(calculatePlatformFee(sum));
    }, [cart]);

    const sendOrderToRestaurant = async () => {
        let items = [];
        cartEntries.map((item) => {
            console.log(item);
            items.push({
                "itemId": item.object.id,
                "itemName": item.object.name,
                "quantity": item.count
            })
        })
        console.log(items)
        const order = {
            "name": form.getFieldValue("name"),
            "email": form.getFieldValue("email"),
            "phoneNo": form.getFieldValue("phoneNo"),
            "additionalInstructions": form.getFieldValue("additionalInstructions"),
            "items": items
        }
        try {
            placeOrder({
                order: order,
                businessId: businessId,
            }).then(({data, error}) => {
                if (data) {
                    console.log(data);
                    router.push(`/order-status/${data.orderNumber}/`)
                } else if (error) {
                    console.log(error);
                }
            })
        } catch (error) {
            notification.error({
                message: "Error!",
                description: "Something went wrong. Please contact the restaurant for instructions!",
                duration: 2,
            });
        }
    };

    if (cartEntries.length === 0) {
        return <EmptyCart message="So empty... Please add some food!"/>;
    }

    return (
        <CartListContainer>
            <SectionCard>
                <Divider plain orientation={"left"}>
                    <ShoppingCartOutlined style={{marginRight: 5}}/>
                    Your Cart
                </Divider>
                <GetAnimation animateIn="fadeInDown">
                    {cartEntries.map(({object, count}, index) => {
                        const imageUrl = getImageUrl(businessId, object.imageId);
                        return (
                            <CartItemCard key={index}>
                                <ItemInfo>
                                    {object.imageId && <ItemImage src={imageUrl} alt={object.name}/>}
                                    <div>
                                        <span>{object.name}</span>
                                        <br/>
                                        <Quantity>qty: {count}</Quantity>
                                    </div>
                                </ItemInfo>
                                <div>
                                    {object.currency}
                                    {roundTo2(object.price * count, true)}
                                </div>
                            </CartItemCard>
                        );
                    })}
                </GetAnimation>
            </SectionCard>

            <SectionCard>
                <Divider plain orientation={"left"}>
                    <DollarOutlined style={{marginRight: 5}}/>
                    Order Summary
                </Divider>
                <GetAnimation animateIn={"fadeInRight"}
                              amount={0.1}>
                    <TotalItemsCard>
                        <div style={{width: "80%"}}>
                            <NoMarginP>Sub-total:</NoMarginP>
                            <NoMarginP>Taxes & Other Fees:</NoMarginP>
                            <NoMarginP>Total:</NoMarginP>
                        </div>
                        <div style={{textAlign: "start"}}>
                            <NoMarginP>${roundTo2(total, true)}</NoMarginP>
                            <NoMarginP>${roundTo2(taxedAmount + platformFee, true)}</NoMarginP>
                            <NoMarginP>${roundTo2(total + taxedAmount + platformFee, true)}</NoMarginP>
                        </div>
                    </TotalItemsCard>
                </GetAnimation>
            </SectionCard>

            <SectionCard>
                <Divider plain orientation={"left"}>
                    <UserOutlined style={{marginRight: 5}}/>
                    User Info
                </Divider>

                <GetAnimation animateIn={"fadeInUp"}
                              amount={null}>

                    <p style={{color: "#555", marginBottom: "10px", textAlign: "start"}}>
                        We need a few details to get your order in!
                    </p>
                    <UserInfoForm loading={placingOrder} onFinish={sendOrderToRestaurant} form={form}/>
                </GetAnimation>
            </SectionCard>
        </CartListContainer>
    );
});

export default CartList;