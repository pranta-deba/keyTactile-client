import { baseApi } from "@/redux/api/baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => {
        return {
          url: "/stat",
          method: "GET",
        };
      },
      providesTags: ["stat"],
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
