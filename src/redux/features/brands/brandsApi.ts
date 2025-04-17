import { baseApi } from "@/redux/api/baseApi";

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
    getAllBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
      providesTags: ["brand"],
    }),
  }),
});

export const { useCreateBrandMutation, useGetAllBrandsQuery } = brandsApi;
