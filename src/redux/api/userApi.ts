import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllUsersResponse, DeleteUserRequest, MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

export const server = "http://localhost:3000";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/user/` }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    delteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: ({userId, adminUserId}) => ({
        url: `${userId}/?id=${adminUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    allUsers: builder.query<AllUsersResponse, string>({
      query: (id) => ({
        url: `all?id=${id}`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const getUser = async (id: String) => {
  try {
    const res = await axios.get(`${server}/api/v1/user/${id}`);
    const data: UserResponse = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation, useAllUsersQuery, useDelteUserMutation } = userApi;
