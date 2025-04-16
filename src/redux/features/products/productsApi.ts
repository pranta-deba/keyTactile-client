import { baseApi } from "@/redux/api/baseApi";
import { ProductQueryParams } from "@/types/products.types";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params: ProductQueryParams = {}) => {
        const { page = 1, limit = 10, search = "", sort = "" } = params;
        return {
          url: "/products",
          method: "GET",
          params: { page, limit, search, sort },
        };
      },
      providesTags: ["product"],
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
