import React, {useContext, useEffect} from "react";
import {ActiveNavigationMenuContext} from "../context/ActiveNavigationProvider";
import {NAVIGATION_ROUTES} from "../components/util/Constants";
import EmployeeInfo from "../components/business/employee/EmployeeInfo";

const EmployeeInfoScreen = () => {
    const {updateActiveNavigationMenu} = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(4))
    }, []);

    return (<EmployeeInfo />)
}

export default EmployeeInfoScreen;
