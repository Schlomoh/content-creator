import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TwitterAuthProvider,
  signOut,
  signInWithPopup,
  User,
} from "firebase/auth";

import { auth } from "@/store/utils/firebaseSetup";
import { setLoading, setUser } from "../slices";
import { persistor } from "..";

export const initiateLoginWithTwitter = createAsyncThunk(
  "auth/initiateLoginWithTwitter",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser(result.user.toJSON() as User));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error logging in with Twitter:", error);
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
      await persistor.purge();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
);
