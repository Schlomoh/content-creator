// src/store/slices/authSlice.js
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { RootState } from "..";

export interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const loadingSelector = createSelector(
  (state: RootState) => state.authSlice,
  (slice: AuthState) => slice.loading
);

export const userSelector = createSelector(
  (state: RootState) => state.authSlice,
  (slice: AuthState) => slice.user
);

export default authSlice;
export const { setUser, setLoading } = authSlice.actions;
