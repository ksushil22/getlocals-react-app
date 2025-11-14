import {rootAPI} from "./rootAPI";
import {PUBLIC_ORDER_API} from "../api_url";

const BASE_URL = process.env.BASE_API_URL;
export const orderAPI = rootAPI.injectEndpoints({
    endpoints: builder => ({
        placeOrder: builder.mutation({
            query: ({order, businessId}) => ({
                url: `${BASE_URL}${PUBLIC_ORDER_API}`,
                method: 'POST',
                headers: {
                    'BUSINESS_ID': businessId
                },
                body: {...order}
            })
        })
    })
})

export const {
    usePlaceOrderMutation
} = orderAPI;
