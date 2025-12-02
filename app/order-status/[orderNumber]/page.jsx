'use client';

import React from 'react';
import OrderStatus from '../../../src/components/orderStatus/OrderStatus';
import { useParams } from 'next/navigation';

export default function OrderStatusPage() {
    const params = useParams();
    const orderNumber = params.orderNumber;

    return <OrderStatus orderNumber={orderNumber} />;
}

