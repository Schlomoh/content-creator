import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store";

export interface StrategyState {
  persona: string;
  contentStructure: string[];
}

const initialState: StrategyState = {
  persona: "",
  contentStructure: [],
};

const strategySlice = createSlice({
  name: "strategySlice",
  initialState,
  reducers: {
    setPersona: (state, action: PayloadAction<string>) => {
      state.persona = action.payload;
    },
    setContentStructure: (state, action: PayloadAction<string[]>) => {
      state.contentStructure = action.payload;
    },
  },
});

export const strategySelector = createSelector(
  (state: RootState) => state.strategySlice,
  (slice: StrategyState) => slice
);

export default strategySlice;
export const { setContentStructure, setPersona } = strategySlice.actions;
