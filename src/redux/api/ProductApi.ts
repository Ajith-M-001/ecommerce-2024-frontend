import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  SearchProductsRequest,
  UpdateProductRequest,
  UserResponse,
} from "../../types/api-types";
import { User } from "../../types/types";

export const server = "http://localhost:3000";

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/product/` }),
  tagTypes:["Product"],
  endpoints: (builder) => ({
    latestProduct: builder.query<AllProductsResponse, string>({
      query: () => ({
        url: "latest",
        
      }),
      providesTags:["Product"]
    }),
    allProduct: builder.query<AllProductsResponse, string>({
      query: (id) => ({
        url: `admin-products?id=${id}`,
      }),
      providesTags:["Product"]
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => ({
        url: `categories`,
      }),
      providesTags:["Product"]
    }),

    searchProduct: builder.query<SearchProductsRequest, SearchProductsRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page:${page}`;
        if (price) {
          base += `&price=${price}`;
        }
        if (sort) {
          base += `&sort=${sort}`;
        }
        if (category) {
          base += `&category=${category}`;
        }
        return base;
      },
      providesTags:["Product"]
    }),

    ProductDetails: builder.query<ProductResponse, string>({
      query: (id) => ({
        url: `${id}`,
        
      }),
      providesTags:["Product"]
    }),

    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ id, formData }) => ({
        url: `/new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags:['Product']
    }),
    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ userId, productId, formData }) => ({
        url: `/${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags:['Product']
    }),
    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `/${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags:['Product']
    }),
  }),
});

export const {
  useLatestProductQuery,
  useAllProductQuery,
  useCategoriesQuery,
    useSearchProductQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductApi;
