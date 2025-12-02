import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {logOut, setCredentials} from "../slicers/authSlicer.js";
import { REFRESH_TOKEN_API } from "../api_url.jsx";
import {message, notification} from "antd";
import { getSessionStorage, setSessionStorage } from "../../utils/storage.js";


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || process.env.BASE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        // Safe sessionStorage access - only on client side
        const access = getSessionStorage("access");
        if(access) {
            headers.set("Authorization", `Bearer ${access}`);
        }
        headers.set("Access-Control-Allow-Origin", 'true');

        return headers
    },
    parseText: true
})

const baseQueryWithReauth = async(args, api, extraOption, overrideRoute) => {

    let result = await baseQuery(args, api, extraOption)

    if (result?.data?.message){
        message.open({
            content: result.data?.message,
            duration: 2.5,
            type: "success"
        })
    }else if(result?.error?.status === 401) {
        setSessionStorage("access", "");

        // send refresh token to get new access token
        const refreshToken = getSessionStorage("refresh");
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
            const currentRefresh = getSessionStorage("refresh");

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
        message.open({
            content: result.error?.data,
            duration: 2.5,
            type: "error"
        });
    }
    return result
}

export const rootAPI = createApi({
    reducerPath: 'api',
    tagTypes: ['User'],
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
