import { baseApi } from "@/redux/api/baseApi";
import { TOrderQueryParams } from "@/types/orders.types";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createOrder: builder.mutation({
        query: (orderData) => {
          return {
            url: "/orders",
            method: "POST",
            body: orderData,
          };
        },
        invalidatesTags: ["order"],
      }),
      getAllOrder: builder.query({
        query: (params: TOrderQueryParams = {}) => {
          const { page = 1, limit = 10, search = "" } = params;
          return {
            url: "/orders",
            method: "GET",
            params: { page, limit, search },
          };
        },
        providesTags: ["order"],
      }),
    };
  },
});

export const { useCreateOrderMutation, useGetAllOrderQuery } = orderApi;
