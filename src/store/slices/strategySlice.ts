import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store";

export interface Structure {
  name: string;
  structure: string;
}
export interface StrategyState {
  persona: string;
  generalTopics: string[];
  structures: Structure[];
}

const initialState: StrategyState = {
  persona: "",
  generalTopics: [],
  structures: [],
};

const strategySlice = createSlice({
  name: "strategySlice",
  initialState,
  reducers: {
    setPersona: (state, action: PayloadAction<string>) => {
      state.persona = action.payload;
    },
    setGeneralTopics: (state, action: PayloadAction<string[]>) => {
      state.generalTopics = action.payload;
    },
    setStructures: (state, action: PayloadAction<Structure[]>) => {
      state.structures = action.payload;
    },
  },
});

export const strategySelector = createSelector(
  (state: RootState) => state.strategySlice,
  (slice: StrategyState) => slice
);

export default strategySlice;
export const { setGeneralTopics, setPersona, setStructures } =
  strategySlice.actions;
