'use client';

import React, { useContext, useEffect } from 'react';
import { ActiveNavigationMenuContext } from '@/lib/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '@/lib/constants/componentConstants';
import Orders from '@/components/business/order/Orders';

export default function OrdersPage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(6));
    }, [updateActiveNavigationMenu]);

    return <Orders />;
}

