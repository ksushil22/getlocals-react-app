import React from "react";
import {COLORS} from "../../constants";
import OrderBucket from "../../../util/OrderBucket";
import {Badge} from "antd";
import CartModal from "./CartModal";

const OrderBar = ({count, cart, businessId}) => {
    const [showCart, setShowCart] = React.useState(false);


    return (<>
        <div
            onClick={() => {setShowCart(!showCart)}}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                top: "60px",
                zIndex: 1000,
                position: "sticky",
                backgroundColor: COLORS.PRIMARY_COLOR,
                backdropFilter: 'blur(10px)',
                opacity: 0.8,
                color: COLORS.PRIMARY_BACKGROUND,
                maxHeight: "50px",
                paddingRight: "20px",
            }}>
            <Badge count={count} color={"red"} >
                <OrderBucket style={{
                    cursor: "pointer"
                }}/>
            </Badge>
        </div>
        <CartModal
            businessId={businessId}
            cart={cart}
            setShowCart={setShowCart}
            showCart={showCart}/>
    </>)
}

export default OrderBar
