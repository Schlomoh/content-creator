import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface InitialModalsState {
  creationModal: {
    open: boolean;
    phase: number;
  };
  strategyModal: {
    open: boolean;
  };
}

const initialState: InitialModalsState = {
  creationModal: {
    open: false,
    phase: 0,
  },
  strategyModal: {
    open: false,
  },
};

const modalsSlice = createSlice({
  name: "modalsSlice",
  initialState,
  reducers: {
    nextPhase: (state) => {
      state.creationModal.phase += 1;
    },
    previousPhase: (state) => {
      state.creationModal.phase -= 1;
    },
    setPhase: (state, action: PayloadAction<number>) => {
      state.creationModal.phase = action.payload;
    },
    toggleCreationModal: (state) => {
      state.creationModal.open = !state.creationModal.open;
    },

    toggleStrategyModal: (state) => {
      state.strategyModal.open = !state.strategyModal.open;
    },
  },
});

export const modalOpenSelector = createSelector(
  (state: RootState) => state.modalsSlice,
  (slice: InitialModalsState) => ({
    creationModalOpen: slice.creationModal.open,
    strategyModalOpen: slice.strategyModal.open,
  })
);

export const modalPhaseSelector = createSelector(
  (state: RootState) => state.modalsSlice,
  (slice: InitialModalsState) => ({
    creationPhase: slice.creationModal.phase,
  })
);

export default modalsSlice;
export const {
  nextPhase,
  previousPhase,
  setPhase,
  toggleCreationModal,
  toggleStrategyModal,
} = modalsSlice.actions;
