import React, {useContext, useEffect} from 'react';
import {ActiveNavigationMenuContext} from "../context/ActiveNavigationProvider";
import {NAVIGATION_ROUTES} from "../components/util/Constants";
import BusinessReview from "../components/business/businessReview/BusinessReview";

export default function () {

    const {updateActiveNavigationMenu} = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(2))
    }, []);

    return <BusinessReview />

}
