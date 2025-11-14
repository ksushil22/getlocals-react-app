import React, {useEffect} from "react";
import {
    Container, Header, Title, ConnectionWrapper, ConnectionStatus,
    StatusIndicator, OrderStatusButton, ClearButton,
    OrdersList, OrderCard, OrderHeader, OrderId, OrderTime,
    OrderDetails, EmptyState, ErrorMessage
} from "./OrderComponents";
import {useWebSocket} from "../../../context/WebSocketContext";
import {List} from "antd";

export default function Orders() {
    const { newOrder, isConnected, error, connect, disconnect } = useWebSocket();

    const orders = [];

    useEffect(() => {
        orders.push(newOrder);
    }, [newOrder])

    return (
        <Container>
            <Header>
                <Title>Orders Dashboard</Title>
                <ConnectionWrapper>
                    <ConnectionStatus>
                        <StatusIndicator isconnected={isConnected}/>
                        <span>{isConnected ? "Accepting Orders" : "Orders Paused"}</span>
                        <OrderStatusButton onClick={() => isConnected ? disconnect() : connect()} isconnected={isConnected}>
                            {isConnected ? "Pause Orders" : "Accept Orders"}
                        </OrderStatusButton>
                    </ConnectionStatus>

                    {orders.length > 0 && <ClearButton onClick={() => orders}>Clear Orders</ClearButton>}
                </ConnectionWrapper>
            </Header>

            {error && <ErrorMessage>{error}. Will attempt to reconnect automatically...</ErrorMessage>}

            {orders.length === 0 ? (
                <EmptyState>
                    <p>No orders yet</p>
                    <p>Orders will appear here in real-time.</p>
                </EmptyState>
            ) : (
                <OrdersList>
                    {orders.map((order, index) => (
                        <OrderCard key={index}>
                            <OrderHeader>
                                <OrderId>Order #{order.orderId || order.id || index + 1}</OrderId>
                                <OrderTime>{order.timestamp ? new Date(order.timestamp).toLocaleString() : "Just now"}</OrderTime>
                            </OrderHeader>
                            <OrderDetails>
                                <pre>{JSON.stringify(order, null, 2)}</pre>
                            </OrderDetails>
                        </OrderCard>
                    ))}
                </OrdersList>
            )}
        </Container>
    );
}
