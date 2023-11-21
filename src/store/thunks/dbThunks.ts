import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseSetup";
import { AppDispatch, RootState } from "..";
import {
  StrategyState,
  setGeneralTopics,
  setPersona,
  setSettings,
  setStructures,
  setUnfinishedBatches,
} from "../slices";
import { ContentBatch } from "@/server/types/database";

const createRandomString = () => Math.random().toString().split(".")[1];

export const listenForUnfinishedBatches = (dispatch: AppDispatch) => {
  const collectionRef = collection(firestore, "content");
  const docsQuery = query(collectionRef, where("finished", "==", false));

  return onSnapshot(docsQuery, (snapshot) => {
    const batches: ContentBatch[] = snapshot.docs.map(
      (doc) => doc.data() as ContentBatch
    );
    dispatch(setUnfinishedBatches(batches));
  });
};

export const listenForContentStrategy = (dispatch: AppDispatch) => {
  const collectionRef = collection(firestore, "strategies");
  const docRef = doc(collectionRef, "guides");

  return onSnapshot(docRef, (snapshot) => {
    const guides = snapshot.data() as StrategyState;
    if (!guides) return;
    dispatch(setStructures(guides?.structures));
    dispatch(setPersona(guides?.persona));
    dispatch(setGeneralTopics(guides?.generalTopics));
  });
};

export const updateContentBatch = createAsyncThunk(
  "db/setCurrentContentBatchState",
  async (_, { getState, dispatch }) => {
    const batchId = createRandomString();
    const date = Date.now();

    try {
      const state = getState() as RootState;
      const { creationData } = state.creationSlice;
      const { phase } = state.modalsSlice.creationModal;
      const data = { batchId, ...creationData, phase, date };
      const docRef = doc(firestore, "content", data.batchId);

      // set local and db state to new content data
      dispatch(setSettings(data));
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.error(error);
    }
  }
);

export const removeContentBatch = createAsyncThunk(
  "db/removeContentBatch",
  async ({ batchId }: ContentBatch) => {
    try {
      const docRef = doc(firestore, "content", batchId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateContentStrategy = createAsyncThunk<void, StrategyState>(
  "db/setContentStrategy",
  async (data) => {
    try {
      const docRef = doc(firestore, "strategies", "guides");
      // set local and db state to new content data
      setDoc(docRef, data);
    } catch (error) {
      console.error(error);
    }
  }
);
