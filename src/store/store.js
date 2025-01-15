import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slices/themeSlice";
import { seriesReducer } from "./slices/seriesSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    series: seriesReducer,
  },
});
