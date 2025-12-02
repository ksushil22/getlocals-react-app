'use client';

import React, { useContext, useEffect } from 'react';
import Home from '../../../../src/components/business/home/Home';
import { ActiveNavigationMenuContext } from '../../../../src/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '../../../../src/components/util/Constants';

export default function HomePage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(0));
    }, [updateActiveNavigationMenu]);

    return <Home />;
}

