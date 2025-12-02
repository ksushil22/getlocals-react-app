import React from 'react'
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useValidateTokenQuery} from "../../redux/services/authAPI";
import GetLoader from "../util/customSpinner/GetLoader";
import {logOut} from "../../redux/slicers/authSlicer";

export default function () {
    const dispatch = useDispatch();

    if (sessionStorage.getItem('access')) {
        const {
            data: isValidToken,
            isLoading,
            error
        } = useValidateTokenQuery(sessionStorage.getItem('access'));
        if (isLoading) {
            return <GetLoader />;
        }else if (error) {
            dispatch(logOut());
            return <Outlet />
        }else {
            return <Navigate to="/" />
        }
    } else {
        return <Outlet />
    }
}
