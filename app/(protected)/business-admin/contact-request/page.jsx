'use client';

import React, { useContext, useEffect } from 'react';
import { ActiveNavigationMenuContext } from '@/lib/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '@/lib/constants/componentConstants';
import ContactRequest from '@/components/business/contactRequest/ContactRequest';

export default function ContactRequestPage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(3));
    }, [updateActiveNavigationMenu]);

    return <ContactRequest />;
}

