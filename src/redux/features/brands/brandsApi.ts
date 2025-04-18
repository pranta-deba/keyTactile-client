import { baseApi } from "@/redux/api/baseApi";
import {  TBrandApiResponse, TBrandQueryParams, TUpdatedBrand } from "@/types";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (brandData) => ({
        url: "/brands",
        method: "POST",
        body: brandData,
      }),
      invalidatesTags: ["brand"],
    }),

    getAllBrands: builder.query<TBrandApiResponse, TBrandQueryParams | void>({
      query: (params) => {
        const urlParams = new URLSearchParams();
        if (params?.page) urlParams.append("page", params.page.toString());
        if (params?.limit) urlParams.append("limit", params.limit.toString());
        if (params?.search) urlParams.append("search", params.search);
        return {
          url: `/brands${
            urlParams.toString() ? `?${urlParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["brand"],
    }),

    getSingleBrand: builder.query({
      query: (id: string) => ({
        url: `/brands/${id}`,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),

    deleteBrand: builder.mutation({
      query: (id: string) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),

    updateBrand: builder.mutation({
      query: ({ id, data }: { id: string; data: TUpdatedBrand }) => ({
        url: `/brands/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
  useGetSingleBrandQuery,
} = brandsApi;
