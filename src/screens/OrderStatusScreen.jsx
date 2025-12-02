import React from "react";
import OrderStatus from "../components/orderStatus/OrderStatus";
import {useParams} from "react-router-dom";

export default function () {
    const { orderNumber } = useParams();

    return <OrderStatus orderNumber={orderNumber} />
}