'use client';

import React, { useContext, useEffect } from 'react';
import { ActiveNavigationMenuContext } from '@/lib/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '@/lib/constants/componentConstants';
import EmployeeInfo from '@/components/business-admin/employee/EmployeeInfo';

export default function EmployeeInfoPage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(4));
    }, [updateActiveNavigationMenu]);

    return <EmployeeInfo />;
}

