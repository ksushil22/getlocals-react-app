import {rootAPI} from "./rootAPI";
import {BUSINESS_ORDER_API, PUBLIC_ORDER_API} from "../api_url";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export const orderAPI = rootAPI.injectEndpoints({
    endpoints: builder => ({
        placeOrder: builder.mutation({
            query: ({order, businessId}) => ({
                url: `${BASE_URL}${PUBLIC_ORDER_API}`,
                method: 'POST',
                headers: {
                    'Business-Id': businessId
                },
                body: {...order}
            })
        }),
        getLast4HoursPendingOrders: builder.query({
            query: (businessId) => ({
                url: `${BASE_URL}${BUSINESS_ORDER_API}pending/`,
                method: 'GET',
                headers: {
                    'Business-Id': businessId
                }
            })
        }),
        updateOrderStatus: builder.mutation({
            query: ({orderId, businessId, status}) => ({
                url: `${BASE_URL}${BUSINESS_ORDER_API}${orderId}/status/`,
                method: 'PUT',
                body: status,
                headers: {
                    "Business-Id": businessId,
                }
            })
        }),
        getOrderDetails: builder.query({
            query: (orderNumber) => ({
                url: `${BASE_URL}${PUBLIC_ORDER_API}${orderNumber}`,
                method: 'GET',
            })
        })
    })
})

export const {
    usePlaceOrderMutation,
    useLazyGetLast4HoursPendingOrdersQuery,
    useUpdateOrderStatusMutation,
    useLazyGetOrderDetailsQuery
} = orderAPI;
