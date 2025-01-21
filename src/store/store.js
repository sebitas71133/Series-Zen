import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slices/themeSlice";
import { seriesReducer } from "./slices/seriesSlice";
import { seriesApi } from "../services/seriesApi";
import { authReducer } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    series: seriesReducer,
    auth: authReducer,
    [seriesApi.reducerPath]: seriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(seriesApi.middleware),
});
