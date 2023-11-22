import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { StrategyState } from "../slices";
import baseQueryWithAuth from "../utils/baseQueryWithAuth";

const STRATEGY_ENDPOINT = "strategy";

const strategyApi = createApi({
  reducerPath: "strategyApi",
  tagTypes: ["strategy"],

  baseQuery: baseQueryWithAuth(STRATEGY_ENDPOINT),

  endpoints: (builder) => ({
    getPostGuides: builder.mutation<
      StrategyState,
      Pick<StrategyState, "persona" | "generalTopics">
    >({
      invalidatesTags: ["strategy"],
      query: (state) => ({
        url: `/contentGuides`,
        method: "POST",
        body: state,
      }),
    }),
  }),
});

export const { useGetPostGuidesMutation } = strategyApi;
export default strategyApi;
