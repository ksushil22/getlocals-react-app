import {rootAPI} from "./rootAPI";
import {AUTH_TOKEN_API, REGISTER_API, USER_PROFILE, VALIDATE_TOKEN} from "../api_url.jsx";

const BASE_API = process.env.BASE_API_URL;
export const authAPI = rootAPI.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: `${BASE_API}${AUTH_TOKEN_API}`,
                method: 'POST',
                body: {...credentials}
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: `${BASE_API}${REGISTER_API}`,
                method: 'POST',
                body: {...credentials}
            })
        }),
        userProfile: builder.query({
            query: () => `${BASE_API}${USER_PROFILE}`
        }),
        validateToken: builder.query({
            query: (token) =>
                `${BASE_API}${VALIDATE_TOKEN}${token}/`
        })
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useUserProfileQuery,
    useValidateTokenQuery
} = authAPI