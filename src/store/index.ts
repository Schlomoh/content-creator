import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authSlice, creationSlice, strategySlice, modalsSlice } from "./slices";
import creationApi from "./api/creationApi";

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

const getRootReducer = () => {
  return combineReducers({
    [authSlice.name]: persistReducer(
      { key: "auth", storage },
      authSlice.reducer
    ),
    [modalsSlice.name]: modalsSlice.reducer,
    [creationSlice.name]: creationSlice.reducer,
    [strategySlice.name]: strategySlice.reducer,
    [creationApi.reducerPath]: creationApi.reducer,
  });
};

const rootReducer = getRootReducer();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(creationApi.middleware);
  },
});

const persistor = persistStore(store);

export { store, persistor, type RootState, type AppDispatch };
