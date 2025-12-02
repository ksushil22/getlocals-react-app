'use client';

import React, { useContext, useEffect } from 'react';
import { ActiveNavigationMenuContext } from '../../../../src/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '../../../../src/components/util/Constants';
import ContactRequest from '../../../../src/components/business/contactRequest/ContactRequest';

export default function ContactRequestPage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(3));
    }, [updateActiveNavigationMenu]);

    return <ContactRequest />;
}

