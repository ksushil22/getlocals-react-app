import React, {useContext, useEffect} from "react";
import {ActiveNavigationMenuContext} from "../context/ActiveNavigationProvider";
import {NAVIGATION_ROUTES} from "../components/util/Constants";
import ContactRequest from "../components/business/contactRequest/ContactRequest";

const ContactRequestScreen = () => {
    const {updateActiveNavigationMenu} = useContext(ActiveNavigationMenuContext);

    useEffect(() => {
        updateActiveNavigationMenu(NAVIGATION_ROUTES.get(3))
    }, []);

    return <ContactRequest />
}

export default ContactRequestScreen;
