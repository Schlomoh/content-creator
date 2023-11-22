import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { NewsResponse } from "@/server/types/news";
import baseQueryWithAuth from "../utils/baseQueryWithAuth";
import { ContentBatch, Post } from "@/server/types/database";

interface PostsResponse {
  posts: Post[];
}

const CONTENT_ENDPOINT = "content";

const creationApi = createApi({
  reducerPath: "creationApi",
  tagTypes: ["news", "posts"],
  baseQuery: baseQueryWithAuth(CONTENT_ENDPOINT),
  endpoints: (builder) => ({
    getNews: builder.query<
      NewsResponse,
      Pick<ContentBatch, "topic" | "thoughts">
    >({
      providesTags: ["news"],
      query: (params) => ({
        url: "news",
        params,
      }),
    }),
    getPosts: builder.mutation<PostsResponse, string>({
      invalidatesTags: ["posts"],
      query: (batchId) => ({
        url: "posts",
        method: "GET",
        params: {
          batchId: batchId,
        },
      }),
    }),
  }),
});

export const { useGetNewsQuery, useGetPostsMutation } = creationApi;
export default creationApi;
