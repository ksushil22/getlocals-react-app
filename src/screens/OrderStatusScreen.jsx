import React from "react";
import OrderStatus from "../components/orderStatus/OrderStatus";
import {useParams} from "next/navigation";

export default function () {
    const { orderNumber } = useParams();

    return <OrderStatus orderNumber={orderNumber} />
}