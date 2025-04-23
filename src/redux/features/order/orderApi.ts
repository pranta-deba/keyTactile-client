import { baseApi } from "@/redux/api/baseApi";

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
    };
  },
});

export const { useCreateOrderMutation } = orderApi;
