import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "./ProductApi";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "../../types/api-types";

export const dashBoardApi = createApi({
  reducerPath: "dashBoardApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/dashboard/` }),
  tagTypes: ["adminDashBoard"],
    endpoints: (builder) => ({

      stats: builder.query<StatsResponse, string>({
          query: (id) => ({
        url: `stats?id=${id}`,
        }),
        providesTags: ['adminDashBoard'],
          keepUnusedDataFor: 0,
    }),
    pie: builder.query<PieResponse, string>({
      query: (id) => ({
        url: `pie?id=${id}`,
      }),
      providesTags: ['adminDashBoard'],
         keepUnusedDataFor: 0,
    }),
    bar: builder.query<BarResponse, string>({
      query: (id) => ({
        url: `bar?id=${id}`,
      }),
      providesTags: ['adminDashBoard'],
         keepUnusedDataFor: 0,
    }),
    line: builder.query<LineResponse, string>({
      query: (id) => ({
        url: `line?id=${id}`,
      }),
      providesTags: ['adminDashBoard'],
         keepUnusedDataFor: 0,
    }),
  }),
});

export const { useStatsQuery, useBarQuery, useLineQuery, usePieQuery } = dashBoardApi;
