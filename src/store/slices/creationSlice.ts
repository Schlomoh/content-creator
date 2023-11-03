import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { ArticlesEntity } from "../types/news";

export interface GeneralSettings {
  topic: string;
  thoughts: string;
  postAmount: number;
}

export interface NewsSettings {
  derivedQuery: string;
  derivedCategory: string;
  newsArticles?: ArticlesEntity[];
}

interface CreationPhase {
  phase: number;
}

type CreationState = CreationPhase & GeneralSettings & NewsSettings;

const initialState: CreationState = {
  topic: "",
  thoughts: "",
  postAmount: 3,
  derivedQuery: "",
  derivedCategory: "",
  newsArticles: [],
  phase: 0,
};

const creationSlice = createSlice({
  name: "creationSlice",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<CreationState>>) => {
      Object.assign(state, action.payload);
    },
    nextPhase: (state) => {
      state.phase += 1;
    },
    previousPhase: (state) => {
      state.phase -= 1;
    },
  },
});

export const creationSelector = createSelector(
  (state: RootState) => state.creationSlice,
  (slice: CreationState) => slice
);

export const creationPhaseSelector = createSelector(
  (state: RootState) => state.creationSlice,
  (slice: CreationState) => slice.phase
);

export const creationNewsSelector = createSelector(
  (state: RootState) => state.creationSlice,
  (slice: CreationState) => slice.newsArticles
);

export default creationSlice;
export const { setSettings, nextPhase, previousPhase } = creationSlice.actions;
