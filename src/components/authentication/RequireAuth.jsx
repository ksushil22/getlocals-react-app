import React, {useContext, useEffect} from "react";

import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useValidateTokenQuery} from "../../redux/services/authAPI";
import GetLoader from "../util/customSpinner/GetLoader";

const RequireAuth = () => {
    //check if we have a token
    const token = sessionStorage?.getItem("access");
    const location = useLocation();

    // useEffect hook to listen to the history and scroll the user to the top of the page when they change components
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [location]);
    if (token) {
        const {
            data: isValidToken,
            isLoading,
            error
        } = useValidateTokenQuery(sessionStorage.getItem('access'));
        if (isLoading) {
            return <GetLoader/>;
        } else if (error) {
            return <Navigate to="/authenticate" state={{from: location}}/>
        }
    }

    return token ? <Outlet/> : <Navigate to="/authenticate" state={{from: location}}/>;
};

export default RequireAuth;
