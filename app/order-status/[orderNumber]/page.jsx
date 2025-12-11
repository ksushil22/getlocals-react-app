'use client';

import React, {useEffect, useState} from "react";
import { useParams } from 'next/navigation';
import {useLazyGetOrderDetailsQuery} from "@/lib/redux/services/orderAPI";
import GetLoader, {SPINNERS} from "@/components/util/customSpinner/GetLoader";
import {
    Container,
    Footer,
    Header,
    OrderDetails,
    OrderItem,
    OrderStatusBody, StatusBadge,
    ThankYouContainer
} from "@/components/orderStatus/OrderStatusComponents";
import {roundTo2} from "@/components/util/Commons";

export default function OrderStatusPage() {
    const params = useParams();
    const orderNumber = params.orderNumber;

    const [triggerOrderDetailsQuery,
        {data: order, error, isLoading}] = useLazyGetOrderDetailsQuery();
    const[status, setStatus] = useState(null);

    useEffect(() => {
        if (orderNumber !== null && orderNumber !== undefined) {
            triggerOrderDetailsQuery(orderNumber);
        }
    }, [orderNumber, triggerOrderDetailsQuery]);

    useEffect(() => {
        switch(order?.status) {
            case "PREPARING": setStatus("👨‍🍳 Our Chef is Preparing your Order"); break;
            case "READY": setStatus("🎉 You can pick your Order Whenever you like"); break;
            case "PENDING": setStatus("We're Confirming your Order!"); break;
            case "DECLINED": setStatus("😔 Sorry! Looks like we cannot fulfill your Order"); break;
            default: setStatus("🍽️ Hope you're Enjoying your Order"); break;
        }
    }, [order]);

    return (
        (isLoading) ? (<GetLoader spinner={SPINNERS.ROTATING_DOT_SPINNER} />) :
            (<OrderStatusBody>
                <Container>
                    <Header status={order?.status}>
                        <h1>{order?.businessName}</h1>
                        <StatusBadge status={order?.status}>{status}</StatusBadge>
                    </Header>

                    <h2>Hello <span>{order?.name}</span>!</h2>
                    {order?.status === 'COMPLETED' && (
                        <ThankYouContainer>
                            <h3>🎉 Thank You!</h3>
                            <p>We hope you enjoyed your order and had a great experience with us!</p>
                        </ThankYouContainer>
                    )}


                    <OrderDetails>
                        <h3>Order Summary</h3>
                        <OrderItem>
                            <span>Order Number:</span>
                            <span>#{order?.orderNumber.slice(-5) || ""}</span>
                        </OrderItem>
                        <OrderItem>
                            <span>Ordered At:</span>
                            <span>{new Date(order?.orderDate).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}</span>
                        </OrderItem>
                        <OrderItem>
                            <span>Order Total:</span>
                            <span >${roundTo2(order?.price, true)}</span>
                        </OrderItem>
                    </OrderDetails>

                    {order?.status === 'COMPLETE' && (<p>We hope to serve you again soon!</p>)}

                    <Footer>
                        <p>Thank you for choosing us!</p>
                        <p>We appreciate your business and look forward to serving you again.</p>
                        <p>If you have any feedback, please don't hesitate to contact us.</p>
                    </Footer>
                </Container>
            </OrderStatusBody>)
    )
}

