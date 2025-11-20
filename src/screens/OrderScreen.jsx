import React, {useContext, useEffect} from 'react';
import {ActiveNavigationMenuContext} from "../context/ActiveNavigationProvider";
import {NAVIGATION_ROUTES} from "../components/util/Constants";
import Orders from "../components/business/order/Orders";
import {WebSocketProvider} from "../context/WebSocketContext";

export default function () {
    const {updateActiveNavigationMenu} = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(6))
    }, []);


    return <Orders />

}
