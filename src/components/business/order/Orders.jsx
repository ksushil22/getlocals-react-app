import React, {useEffect, useState} from "react";
import {
    Container, Header, Title, ConnectionWrapper, ConnectionStatus,
    StatusIndicator, OrderStatusButton, ClearButton, ErrorMessage,
    SplitContainer, OrdersListPanel, OrderDetailPanel,
    OrderListItem, OrderListHeader, OrderCustomerName, OrderItemCount,
    OrderDetailHeader, OrderDetailContent, CustomerInfo,
    ItemsList, ItemRow, ItemQuantity, ItemName,
    AdditionalInstructions, ActionButtons, AcceptButton, RejectButton,
    EmptyDetailState, EmptyListState, OrderIdBadge, OrderStatusBadge, ActiveOrdersContainer, HistoricalOrdersWrapper,
    HistoricalOrdersContainer
} from "./OrderComponents";
import {useWebSocket} from "../../../context/WebSocketContext";


export default function Orders() {
    const { newOrder, isConnected, error, connect, disconnect } = useWebSocket();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showHistorical, setShowHistorical] = useState(false);

    useEffect(() => {
        console.log("New Order: ", newOrder);
        if (newOrder) {
            setOrders(prevOrders => {
                const existingOrderIndex = prevOrders.findIndex(order => order.orderNumber === newOrder.orderNumber);
                
                if (existingOrderIndex !== -1) {
                    // Update existing order
                    const updatedOrders = [...prevOrders];
                    updatedOrders[existingOrderIndex] = newOrder;
                    return updatedOrders;
                } else {
                    // Add new order at the beginning
                    const orderWithStatus = { ...newOrder, status: 'PENDING', orderDate: new Date().toISOString() };
                    return [orderWithStatus, ...prevOrders];
                }
            });
        }
    }, [newOrder]);

    // Keep selected order in sync with orders array
    useEffect(() => {
        if (selectedOrder) {
            const updatedOrder = orders.find(order => order.orderNumber === selectedOrder.orderNumber);
            if (updatedOrder) {
                setSelectedOrder(updatedOrder);
            }
        }
    }, [orders]);

    const handleAcceptOrder = (orderId) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.orderNumber === orderId ? { ...order, status: 'PREPARING' } : order
            )
        );
        // TODO: Send accept notification to backend
    };

    const handleRejectOrder = (orderId) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.orderNumber === orderId ? { ...order, status: 'DECLINED' } : order
            )
        );
        // TODO: Send reject notification to backend
    };

    const handleCompleteOrder = (orderId) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.orderNumber === orderId ? { ...order, status: 'COMPLETED' } : order
            )
        );
        // TODO: Send complete notification to backend
    };

    const getTotalItems = (items) => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    // Separate active and historical orders
    const activeOrders = orders.filter(order => 
        order.status === 'PENDING' || order.status === 'PREPARING'
    );
    
    const historicalOrders = orders.filter(order => 
        order.status === 'COMPLETED' || order.status === 'DECLINED'
    );

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

                    {orders.length > 0 && <ClearButton onClick={() => setOrders([])}>Clear Orders</ClearButton>}
                </ConnectionWrapper>
            </Header>

            {error && <ErrorMessage>{error}. Will attempt to reconnect automatically...</ErrorMessage>}

            <SplitContainer>
                <OrdersListPanel>
                    <ActiveOrdersContainer>
                        <OrderListHeader>Active Orders ({activeOrders.length})</OrderListHeader>
                        {activeOrders.length === 0 ? (
                            <EmptyListState>
                                <p>No active orders</p>
                                <p>New orders will appear here in real-time.</p>
                            </EmptyListState>
                        ) : (
                            activeOrders.map((order) => (
                                <OrderListItem 
                                    key={order.orderNumber}
                                    isSelected={selectedOrder?.orderNumber === order.orderNumber}
                                    onClick={() => setSelectedOrder(order)}
                                    status={order.status}
                                >
                                    <div>
                                        <OrderCustomerName>{order.name}</OrderCustomerName>
                                        <OrderItemCount>{getTotalItems(order.items)} items</OrderItemCount>
                                    </div>
                                    <OrderStatusBadge status={order.status || 'PENDING'}>
                                        {order.status || 'PENDING'}
                                    </OrderStatusBadge>
                                </OrderListItem>
                            ))
                        )}
                    </ActiveOrdersContainer>

                    {historicalOrders.length > 0 && (
                        <HistoricalOrdersWrapper>
                            <OrderListHeader
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: showHistorical ? '#f0f0f0' : '#fff',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderTop: 'none',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onClick={() => setShowHistorical(!showHistorical)}
                            >
                                <span>Order History ({historicalOrders.length})</span>
                                <span style={{ 
                                    fontSize: '16px',
                                    transition: 'transform 0.3s ease',
                                    transform: showHistorical ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}>▲</span>
                            </OrderListHeader>

                            <HistoricalOrdersContainer isOpen={showHistorical}>
                                {historicalOrders.map((order) => (
                                    <OrderListItem
                                        key={order.orderNumber}
                                        isSelected={selectedOrder?.orderNumber === order.orderNumber}
                                        onClick={() => setSelectedOrder(order)}
                                        status={order.status}
                                        style={{ opacity: 0.7 }}
                                    >
                                        <div>
                                            <OrderCustomerName>{order.name}</OrderCustomerName>
                                            <OrderItemCount>{getTotalItems(order.items)} items</OrderItemCount>
                                        </div>
                                        <OrderStatusBadge status={order.status}>
                                            {order.status}
                                        </OrderStatusBadge>
                                    </OrderListItem>
                                ))}
                            </HistoricalOrdersContainer>
                        </HistoricalOrdersWrapper>
                    )}
                </OrdersListPanel>

                <OrderDetailPanel>
                    {selectedOrder ? (
                        <>
                            <OrderDetailHeader>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <OrderIdBadge>Order #{selectedOrder.orderNumber}</OrderIdBadge>
                                    <OrderStatusBadge status={selectedOrder.status || 'PENDING'} style={{ fontSize: '14px' }}>
                                        {selectedOrder.status || 'PENDING'}
                                    </OrderStatusBadge>
                                </div>
                                {selectedOrder.orderDate && (
                                    <span>{new Date(selectedOrder.orderDate).toLocaleString()}</span>
                                )}
                            </OrderDetailHeader>

                            <OrderDetailContent>
                                <CustomerInfo>
                                    <h3>Customer Information</h3>
                                    <p><strong>Name:</strong> {selectedOrder.name}</p>
                                    <p><strong>Email:</strong> {selectedOrder.email}</p>
                                    <p><strong>Phone:</strong> {selectedOrder.phoneNo}</p>
                                </CustomerInfo>
                                {selectedOrder.status === 'PENDING' && (
                                    <ActionButtons>
                                        <AcceptButton onClick={() => handleAcceptOrder(selectedOrder.orderNumber)}>
                                            Accept Order
                                        </AcceptButton>
                                        <RejectButton onClick={() => handleRejectOrder(selectedOrder.orderNumber)}>
                                            Decline Order
                                        </RejectButton>
                                    </ActionButtons>
                                )}

                                {selectedOrder.status === 'PREPARING' && (
                                    <>
                                        <ActionButtons>
                                            <AcceptButton onClick={() => handleCompleteOrder(selectedOrder.orderNumber)}>
                                                Mark as Completed
                                            </AcceptButton>
                                        </ActionButtons>
                                    </>
                                )}

                                {selectedOrder.status === 'DECLINED' && (
                                    <OrderStatusBadge status="DECLINED" style={{ marginTop: '20px', fontSize: '18px' }}>
                                        Order Declined ✗
                                    </OrderStatusBadge>
                                )}

                                {selectedOrder.status === 'COMPLETED' && (
                                    <OrderStatusBadge status="COMPLETED" style={{ marginTop: '20px', fontSize: '18px' }}>
                                        Order Completed ✓
                                    </OrderStatusBadge>
                                )}

                                <ItemsList>
                                    <h3>Order Items</h3>
                                    <div className={"items"} style={{
                                        backgroundColor: '#f8f9fa',
                                        padding: 10
                                    }}>
                                        {selectedOrder.items.map((item, index) => (
                                            <ItemRow key={index}>
                                                <ItemQuantity>{item.quantity}x</ItemQuantity>
                                                <ItemName>{item.itemName}</ItemName>
                                            </ItemRow>
                                        ))}

                                    </div>
                                </ItemsList>

                                {selectedOrder.additionalInstructions && (
                                    <AdditionalInstructions>
                                        <h3>Additional Instructions</h3>
                                        <p>{selectedOrder.additionalInstructions}</p>
                                    </AdditionalInstructions>
                                )}

                            </OrderDetailContent>
                        </>
                    ) : (
                        <EmptyDetailState>
                            <p>Select an order to view details</p>
                        </EmptyDetailState>
                    )}
                </OrderDetailPanel>
            </SplitContainer>
        </Container>
    );
}