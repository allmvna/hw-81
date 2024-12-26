import { configureStore } from "@reduxjs/toolkit";
import {linksReducer} from "../slices/sliceLink/sliceLink.tsx";

export const store = configureStore({
  reducer: {
    app: linksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
