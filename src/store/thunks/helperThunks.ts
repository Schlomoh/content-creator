import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetCreationData, setPhase } from "../slices";

export const resetCreation = createAsyncThunk(
  "creation/resetCreation",
  async (_, { dispatch }) => {
    dispatch(resetCreationData());
    dispatch(setPhase(0));
  }
);
