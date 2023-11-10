import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import getBackendUrl from "./getBackendUrl";
import { auth } from "./firebaseSetup";

// Separate base query configuration to its own function
const baseQueryWithAuth = (mainSlug: string) => {
  return fetchBaseQuery({
    baseUrl: getBackendUrl(mainSlug),
    prepareHeaders: async (headers) => {
      const idToken = await auth.currentUser?.getIdToken(true);
      headers.set("Content-Type", "application/json");
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
    },
  });
};

export default baseQueryWithAuth;
