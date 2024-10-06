import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "./ProductApi";
import { AllOrdersResponse, MessageResponse, NewOrderRequest, OrderDetailsResponse, UpdateOrderRequest } from "../../types/api-types";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/order/` }),
  tagTypes: ["Order","adminDashBoard"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
    myOrder: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `myorder?userId=${id}`,
      }),
      providesTags: ["Order"],
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `allorders?id=${id}`,
      }),
      providesTags: ["Order"],
    }),
    orderById: builder.query<OrderDetailsResponse, string>({
      query: (id) => ({
        url: `${id}`,
      }),
      providesTags: ["Order"],
    }),
    updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({orderId, userId}) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
        invalidatesTags: ["Order", "adminDashBoard"],
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({orderId, userId}) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useNewOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation, useMyOrderQuery, useAllOrdersQuery, useOrderByIdQuery } = OrderApi;
