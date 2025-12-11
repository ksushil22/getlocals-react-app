'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import OrderStatus from '@/components/orderStatus/OrderStatus';

/**
 * Universal Order Status Page for all slug paths
 * Works with any template - displays order status without template layout
 */
const OrderStatusPage = ({ businessId }) => {
    const params = useParams();
    // The order number is the second element in the path array
    // e.g., /slug/order-status/ORDER123 -> path = ['order-status', 'ORDER123']
    const orderNumber = params.path?.[1];

    return <OrderStatus orderNumber={orderNumber} />;
};

export default OrderStatusPage;

