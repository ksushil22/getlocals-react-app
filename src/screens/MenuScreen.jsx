import React, {useContext, useEffect} from 'react';
import BusinessMenu from "../components/business/menu/BusinessMenu";
import {ActiveNavigationMenuContext} from "../context/ActiveNavigationProvider";
import {NAVIGATION_ROUTES} from "../components/util/Constants";

export default function () {
    const {updateActiveNavigationMenu} = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(1))
    }, []);


    return <div>
        <BusinessMenu editing={true}/>
    </div>
}
