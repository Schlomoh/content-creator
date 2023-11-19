import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store";

import { ContentBatch } from "@/server/types/database";

interface CreationState {
  creationData: Partial<ContentBatch>;
  unfinishedBatches: ContentBatch[];
}

const initialState: CreationState = {
  creationData: {
    finished: false,
    topic: "",
    thoughts: "",
    postAmount: 3,
    selectedArticles: [],
  },
  unfinishedBatches: [],
};

const creationSlice = createSlice({
  name: "creationSlice",
  initialState,
  reducers: {
    setUnfinishedBatches: (
      state: CreationState,
      action: PayloadAction<ContentBatch[]>
    ) => {
      state.unfinishedBatches = action.payload;
    },
    setSettings: (
      state: CreationState,
      action: PayloadAction<Partial<ContentBatch>>
    ) => {
      Object.assign(state.creationData, action.payload);
    },
    resetCreationData: (state) => {
      Object.assign(state.creationData, initialState.creationData);
    },
  },
});

export const creationSelector = createSelector(
  (state: RootState) => state.creationSlice,
  (slice: CreationState) => slice.creationData
);

export const creationNewsSelector = createSelector(
  (state: RootState) => state.creationSlice,
  (slice: CreationState) => slice.creationData.selectedArticles
);

export const unfinishedBatchesSelector = createSelector(
  (state: RootState) => state.creationSlice,
  (slice: CreationState) => slice.unfinishedBatches
);

export default creationSlice;
export const { setSettings, setUnfinishedBatches, resetCreationData } =
  creationSlice.actions;
