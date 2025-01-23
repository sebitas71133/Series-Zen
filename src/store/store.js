import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slices/themeSlice";
import { seriesReducer } from "./slices/seriesSlice";
import { seriesApi } from "../services/seriesApi";
import { sessionReducer } from "./slices/sessionSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    series: seriesReducer,
    session: sessionReducer,
    [seriesApi.reducerPath]: seriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(seriesApi.middleware),
});
