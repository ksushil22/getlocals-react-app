import React from "react";
import {COLORS} from "../constants";
import OrderBucket from "../../util/OrderBucket";
import {Badge} from "antd";

const OrderBar = ({count}) => {
    return (<div style={{
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
        paddingRight: "20px"
    }}>
        <Badge count={count} color={"red"} >
            <OrderBucket />
        </Badge>
    </div>)
}

export default OrderBar
