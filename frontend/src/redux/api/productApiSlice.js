import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

import { apiSlice } from "./apiSlice.js";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCTS_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (productId) => `${PRODUCTS_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),

    allProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/allproducts`,
      }),
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProducts: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `https://api.cloudinary.com/v1_1/dbfahboiz/image/upload`,
        method: "POST",
        body: data,
      }),
    }),

    deleteProducts: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
        keepUnusedDataFor: 5,
      }),
    }),

    getNewProducts: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}/new`,
        keepUnusedDataFor: 5,
      }),
    }),
    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCTS_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
  }),
});

export const {
  useAllProductsQuery,
  useCreateProductMutation,
  useCreateReviewMutation,
  useDeleteProductsMutation,
  useGetNewProductsMutation,
  useGetProductByIdQuery,
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useUpdateProductsMutation,
  useUploadProductImageMutation,
  useGetTopProductsQuery,
  useGetFilteredProductsQuery,
} = productApiSlice;
