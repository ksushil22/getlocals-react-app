'use client';

import React, { useContext, useEffect } from 'react';
import Home from '@/components/business/home/Home';
import { ActiveNavigationMenuContext } from '@/lib/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '@/lib/constants/componentConstants';

export default function HomePage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(0));
    }, [updateActiveNavigationMenu]);

    return <Home />;
}

