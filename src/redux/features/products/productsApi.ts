import { baseApi } from "@/redux/api/baseApi";
import { ProductQueryParams, TUpdateProduct, TUpdateQuantity } from "@/types";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => {
        return {
          url: "/products",
          method: "POST",
          body: productData,
        };
      },
      invalidatesTags: ["product"],
    }),

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

    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }: { id: string; data: Partial<TUpdateProduct> }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    updateProductQuantity: builder.mutation({
      query: ({ productId, action, quantity }: TUpdateQuantity) => {
        const queryString = quantity != null ? `?quantity=${quantity}` : "";
        return {
          url: `/products/${productId}/quantity${queryString}`,
          method: "PATCH",
          body: { action },
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUpdateProductQuantityMutation,
} = productsApi;
