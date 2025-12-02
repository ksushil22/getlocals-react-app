'use client';

import React, { useContext, useEffect } from 'react';
import { ActiveNavigationMenuContext } from '../../../../src/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '../../../../src/components/util/Constants';
import Orders from '../../../../src/components/business/order/Orders';

export default function OrdersPage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(6));
    }, [updateActiveNavigationMenu]);

    return <Orders />;
}

