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
import {
    useLazyGetLast4HoursPendingOrdersQuery, useUpdateOrderStatusMutation
} from "../../../redux/services/orderAPI";
import GetLoader, {DISPLAY, SPINNERS} from "../../util/customSpinner/GetLoader";
import {useSelector} from "react-redux";


export default function Orders() {
    const { newOrder, isConnected, error, connect, disconnect } = useWebSocket();
    const businessId = useSelector((state) => state.business.businessId)

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showHistorical, setShowHistorical] = useState(false);
    const [triggerPendingOrderQuery, {
        data: pendingOrders,
        isLoading: loadingPendingOrders
    }]   = useLazyGetLast4HoursPendingOrdersQuery()
    const [updateOrderStatus, {isLoading: updatingOrderStatus}] = useUpdateOrderStatusMutation();

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
                    const orderWithStatus = { ...newOrder };
                    return [orderWithStatus, ...prevOrders];
                }
            });
        }
    }, [newOrder]);

    useEffect(() => {
        if (pendingOrders != null && pendingOrders.length > 0) {
            setOrders(pendingOrders)
        }
    }, [pendingOrders])

    useEffect(() => {
        if (isConnected) triggerPendingOrderQuery(businessId);
    }, [businessId, triggerPendingOrderQuery, isConnected])

    // Keep selected order in sync with orders array
    useEffect(() => {
        if (selectedOrder) {
            const updatedOrder = orders.find(order => order.orderNumber === selectedOrder.orderNumber);
            if (updatedOrder) {
                setSelectedOrder(updatedOrder);
            }
        }
    }, [orders]);

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        await updateOrderStatus({
            orderId: orderId,
            businessId: businessId,
            status: {
                "newOrderStatus": newStatus
            }
        }).then( () => {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.orderNumber === orderId ? { ...order, status: newStatus } : order
                    )
                )

            if (newStatus === 'COMPLETED') {
                setSelectedOrder(null)
            }
        });
    };

    const getTotalItems = (items) => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    // Separate active and historical orders
    const activeOrders = orders.filter(order =>
        order.status === 'PENDING' || order.status === 'PREPARING'
    );

    const historicalOrders = orders.filter(order =>
        order.status === 'COMPLETED' || order.status === 'DECLINED' || order.status === 'READY'
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
                </ConnectionWrapper>
            </Header>

            {error && <ErrorMessage>{error}. Will attempt to reconnect automatically...</ErrorMessage>}

            <SplitContainer>
                <OrdersListPanel>
                    <ActiveOrdersContainer>
                        <OrderListHeader>Active Orders ({activeOrders.length})</OrderListHeader>
                        {loadingPendingOrders ? (
                            <GetLoader display={DISPLAY.AREA}
                                       spinner={SPINNERS.SKELETON}
                                       text={'Loading Pending Orders...'}
                                        />
                        )
                            : activeOrders.length === 0 ? (
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
                                        <AcceptButton loading={updatingOrderStatus} onClick={() => handleUpdateOrderStatus(selectedOrder.orderNumber, 'PREPARING')}>
                                            Accept Order
                                        </AcceptButton>
                                        <RejectButton loading={updatingOrderStatus} onClick={() => handleUpdateOrderStatus(selectedOrder.orderNumber, 'DECLINED')}>
                                            Decline Order
                                        </RejectButton>
                                    </ActionButtons>
                                )}

                                {selectedOrder.status === 'PREPARING' && (
                                    <>
                                        <ActionButtons>
                                            <AcceptButton loading={updatingOrderStatus} onClick={() => handleUpdateOrderStatus(selectedOrder.orderNumber, 'READY')}>
                                                Mark Ready
                                            </AcceptButton>
                                        </ActionButtons>
                                    </>
                                )}

                                {selectedOrder.status === 'READY' && (
                                    <>
                                        <ActionButtons>
                                            <AcceptButton loading={updatingOrderStatus} onClick={() => handleUpdateOrderStatus(selectedOrder.orderNumber, 'COMPLETED')}>
                                                Mark Completed
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

                                {selectedOrder.additionalInstructions && (
                                    <AdditionalInstructions>
                                        <h3>Additional Instructions</h3>
                                        <p>{selectedOrder.additionalInstructions}</p>
                                    </AdditionalInstructions>
                                )}

                                <ItemsList>
                                    <h3>Order Items</h3>
                                    <div className={"items"} style={{
                                        backgroundColor: '#f8f9fa',
                                    }}>
                                        {selectedOrder.items.map((item, index) => (
                                            <ItemRow key={index}>
                                                <ItemQuantity>{item.quantity}x</ItemQuantity>
                                                <ItemName>{item.itemName}</ItemName>
                                            </ItemRow>
                                        ))}

                                    </div>
                                </ItemsList>

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