'use client';

import React, { useContext, useEffect } from 'react';
import { ActiveNavigationMenuContext } from '../../../../src/context/ActiveNavigationProvider';
import { NAVIGATION_ROUTES } from '../../../../src/components/util/Constants';
import EmployeeInfo from '../../../../src/components/business/employee/EmployeeInfo';

export default function EmployeeInfoPage() {
    const { updateActiveNavigationMenu } = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(4));
    }, [updateActiveNavigationMenu]);

    return <EmployeeInfo />;
}

