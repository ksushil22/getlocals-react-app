'use client';

import React, { useContext, useEffect } from 'react';
import BusinessMenu from '@/components/business/menu/BusinessMenu';
import { ActiveNavigationMenuContext } from '@/lib/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '@/lib/constants/componentConstants';

export default function MenuItemsPage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(1));
    }, [updateActiveNavigationMenu]);

    return (
        <div>
            <BusinessMenu editing={true} />
        </div>
    );
}

