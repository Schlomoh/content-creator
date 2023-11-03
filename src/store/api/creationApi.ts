import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { NewsResponse } from "../types/news";
import baseQueryWithAuth from "../utils/baseQueryWithAuth";

const CONTENT_ENDPOINT = "/content";

const creationApi = createApi({
  reducerPath: "creationApi",
  tagTypes: ["news"],
  baseQuery: baseQueryWithAuth(CONTENT_ENDPOINT),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, { thoughts: string; topic: string }>({
      providesTags: ["news"],
      query: (params) => ({
        url: "news",
        params,
      }),
    }),
  }),
});

export const { useGetNewsQuery } = creationApi;
export default creationApi;
