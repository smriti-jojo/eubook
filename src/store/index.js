import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./auth";
import bookReducer from "../store/MyBooks";

const persistConfig = {
  key: "root",
  version: 1,
  blacklist: ["auth"],
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
