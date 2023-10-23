import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["default"],

  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:${import.meta.env.VITE_PORT}/api`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    isAuthenticated: builder.query<boolean, void>({
      query: () => `isAuthenticated`,
      providesTags: ["default"],
      transformResponse(baseQueryReturnValue: { isAuthenticated: boolean }) {
        return !!baseQueryReturnValue?.isAuthenticated;
      },
    }),

    getProfile: builder.query<{ user: UserProfile | null }, void>({
      query: () => `profile`,
      providesTags: ["default"],
    }),
  }),
});

export const { useGetProfileQuery, useIsAuthenticatedQuery } = userApi;
export default userApi;
