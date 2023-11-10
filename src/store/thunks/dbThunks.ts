import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseSetup";
import { RootState } from "..";
import { setUnfinishedBatches } from "../slices";
import { ContentBatch } from "@/server/types/database";
import { resetCreation } from ".";

const createRandomString = () => Math.random().toString().split(".")[1];

export const getUnfinishedBatches = createAsyncThunk(
  "db/getCurrentContentBatch",
  async (_, { dispatch }) => {
    try {
      const collectionRef = collection(firestore, "content");
      const docsQuery = query(collectionRef, where("finished", "==", false));
      const docsRef = await getDocs(docsQuery);
      const docs = docsRef.docs;

      dispatch(resetCreation())
      dispatch(
        setUnfinishedBatches(docs.map((doc) => doc.data() as ContentBatch))
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateContentBatch = createAsyncThunk(
  "db/setCurrentContentBatchState",
  async (_, { getState }) => {
    const batchId = createRandomString();
    try {
      const state = (getState() as RootState).creationSlice;
      const data = { finished: false, batchId, ...state.creationData };

      const docRef = doc(
        firestore,
        "content",
        state.creationData.batchId || batchId
      );
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.error(error);
    }
  }
);
