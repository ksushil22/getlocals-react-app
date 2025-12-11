import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {logOut, setCredentials} from "../slicers/authSlicer.js";
import { REFRESH_TOKEN_API } from "../api_url.jsx";
import {message, notification} from "antd";


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.BASE_API_URL || '',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        if (typeof window !== 'undefined') {
            const access = sessionStorage.getItem("access");
            if(access) {
                headers.set("Authorization", `Bearer ${access}`);
            }
        }
        headers.set("Access-Control-Allow-Origin", 'true');

        return headers
    },
    parseText: true
})

const baseQueryWithReauth = async(args, api, extraOption, overrideRoute) => {

    const canNotify = typeof window !== 'undefined';

    let result = await baseQuery(args, api, extraOption)

    if (result?.data?.message && canNotify){
        message.open({
            content: result.data?.message,
            duration: 2.5,
            type: "success"
        })
    }else if(result?.error?.status === 401) {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("access", "");
        }

        // send refresh token to get new access token
        const refreshToken = typeof window !== 'undefined' ? sessionStorage.getItem("refresh") : null;
        const refreshResult = await baseQuery(
            {
                url: REFRESH_TOKEN_API,
                method: 'POST',
                body: {
                    refreshToken: refreshToken,
                },
            },
            api,
            extraOption
        );


        if(refreshResult?.data) {
            const user = api.getState().auth.username;
            const currentRefresh = typeof window !== 'undefined' ? sessionStorage.getItem("refresh") : null;

            //  store the new token
            refreshResult.data['refresh'] = currentRefresh;

            api.dispatch(setCredentials({...refreshResult.data, user}))

            // retry the original query with new access token
            result = await baseQuery(args, api, extraOption)
        } else {
            // if refresh token is also invalid set the credentials to null and navigate user to login page
            api.dispatch(logOut())
        }
    }else if (result?.error) {
        console.log("Got an error. Opening a message for it.")
        if (canNotify) {
            message.open({
                content: result.error?.data,
                duration: 2.5,
                type: "error"
            });
        }
    }
    return result
}

export const rootAPI = createApi({
    reducerPath: 'api',
    tagTypes: ['User', 'categories', 'menu-items', 'employee-info'],
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
