'use client';

import React, { useContext, useEffect } from 'react';
import { ActiveNavigationMenuContext } from '../../../../src/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '../../../../src/components/util/Constants';
import BusinessReview from '../../../../src/components/business/businessReview/BusinessReview';

export default function ReviewsPage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(2));
    }, [updateActiveNavigationMenu]);

    return <BusinessReview />;
}

