'use client';

import React, { useContext, useEffect } from 'react';
import BusinessMenu from '../../../../src/components/business/menu/BusinessMenu';
import { ActiveNavigationMenuContext } from '../../../../src/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '../../../../src/components/util/Constants';

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

