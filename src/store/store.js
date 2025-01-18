import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slices/themeSlice";
import { seriesReducer } from "./slices/seriesSlice";
import { seriesApi } from "../services/seriesApi";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    series: seriesReducer,
    [seriesApi.reducerPath]: seriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(seriesApi.middleware),
});
