'use client';

import React, { useContext, useEffect } from 'react';
import { ActiveNavigationMenuContext } from '@/lib/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '@/lib/constants/componentConstants';
import BusinessReview from '@/components/business-admin/businessReview/BusinessReview';

export default function ReviewsPage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(2));
    }, [updateActiveNavigationMenu]);

    return <BusinessReview />;
}

