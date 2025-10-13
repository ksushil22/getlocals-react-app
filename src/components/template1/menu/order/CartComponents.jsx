import React, {memo, useEffect, useState} from "react";
import styled from "styled-components";
import {calculatePlatformFee, calculateTax, getImageUrl, roundTo2} from "../../../util/Commons";
import {EmptyCart} from "./EmptyCartGIF";
import {Divider} from "antd";

const CartListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    width: 100%;
`;

const CartItemCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 8px;
    padding: 8px 16px;
`;

const TotalItemsCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 8px;
    padding: 8px 16px;
    text-align: end !important;
`;

const ItemInfo = styled.div`
    display: flex;
    gap: 12px;
    text-align: start !important;
`;

const ItemImage = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 6px;
`;

const Quantity = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #888;
`;

const NoMarginP = styled.p`
    margin: 0;
`

const CartList = memo(({cart, businessId}) => {
    const cartEntries = Object.values(cart);
    const [total, setTotal] = useState(0);
    const [taxedAmount, setTaxedAmount] = useState(0);
    const [platformFee, setPlatformFee] = useState(0);

    useEffect(() => {
        let sum = 0;
        cartEntries.forEach((item) => {
            sum+=(item.object.price*item.count)
        });
        setTotal(sum);
        setTaxedAmount(calculateTax(sum));
        setPlatformFee(calculatePlatformFee(sum));
    }, [cart]);

    if (cartEntries.length === 0) {
        return <EmptyCart message={"No food in your cart."}/>;
    }

    return (
        <CartListContainer>
            {cartEntries.map(({object, count}, index) => {
                const imageUrl = getImageUrl(businessId, object.imageId);
                return (<>
                        <CartItemCard key={index}>
                            <ItemInfo>
                                {object.imageId && <ItemImage src={imageUrl} alt={object.name}/>}
                                <div style={{
                                    textAlign: "start !important",
                                }}>
                                    <span>{object.name}</span><br/>
                                    <Quantity>qty: <span>{count}</span></Quantity>
                                </div>
                            </ItemInfo>

                            <div>
                                {object.currency}{object.price * count}
                            </div>
                        </CartItemCard>
                        <Divider style={{margin: 0}}/>
                    </>
                );
            })}
            <TotalItemsCard>
                <div style={{
                    width: "80%",
                }}>
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
        </CartListContainer>
    );
});

export default CartList;
