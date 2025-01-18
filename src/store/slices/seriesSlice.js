import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import {
  getSeries,
  getTemporadasBySerie,
  loadSeriesData,
} from "../../api/supabaseApi";

// export const fetchLoadSeriesData = createAsyncThunk(
//   "seasons/fetchEpisodes",
//   async ({ slug, selectedNumberSeason }, { rejectWithValue }) => {
//     try {
//       const { episodes, serie, season, seasons, categories } =
//         await loadSeriesData(slug, selectedNumberSeason); // Llamada a la API
//       console.log(serie);

//       return { episodes, serie, seasons, season, categories }; // Devuelve los episodios como resultado
//     } catch (error) {
//       return rejectWithValue(error.message); // Maneja errores
//     }
//   }
// );

// export const fetchTemporadasBySerie = createAsyncThunk(
//   "seasons/fetchTemporadas",
//   async ({ serieId }, { rejectWithValue }) => {
//     try {
//       const { seasons } = await getTemporadasBySerie(serieId); // Llamada a la API
//       return { seasons }; // Devuelve los episodios como resultado
//     } catch (error) {
//       return rejectWithValue(error.message); // Maneja errores
//     }
//   }
// );

// export const fetchAllSeries = createAsyncThunk(
//   "series/fetchAllSeries",
//   async ({ all }, { rejectWithValue }) => {
//     try {
//       const { series } = await getSeries();

//       return { series };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    series: [],
    selectedSerie: { id: 1 },
    seasons: [],
    selectedSeason: null,
    selectedNumberSeason: 1,
    episodes: [],
    selectedEpisode: null,
    loading: false,
    error: null,
    categories: [],
  },

  reducers: {
    setSeries: (state, action) => {
      state.series = action.payload;
    },
    selectSerie: (state, action) => {
      state.selectedSerie = action.payload;
    },
    setSeasons: (state, action) => {
      state.seasons = action.payload;
    },
    selectSeason: (state, action) => {
      state.selectedSeason = action.payload;
    },
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
    },
    selectEpisode: (state, action) => {
      state.selectedEpisode = action.payload;
    },
    setSelectedNumberSeason: (state, action) => {
      state.selectedNumberSeason = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchLoadSeriesData.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchLoadSeriesData.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.episodes = action.payload.episodes;
  //       state.selectedSerie = action.payload.serie;
  //       state.selectedSeason = action.payload.season;
  //       state.seasons = action.payload.seasons;
  //       state.categories = action.payload.categories;
  //     })
  //     .addCase(fetchLoadSeriesData.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(fetchTemporadasBySerie.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchTemporadasBySerie.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.seasons = action.payload.seasons; // Actualiza las temporadas
  //       state.selectedSeason = action.payload.seasons[0]; //Iniciar con la temporada 1.
  //     })
  //     .addCase(fetchTemporadasBySerie.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload; // Maneja el error
  //     })
  //     .addCase(fetchAllSeries.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchAllSeries.fulfilled, (state, action) => {
  //       state.loading = false;

  //       state.series = action.payload.series; // Actualiza las temporadas
  //     })
  //     .addCase(fetchAllSeries.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload; // Maneja el error
  //     });
  // },
});

export const seriesReducer = seriesSlice.reducer;
export const {
  selectEpisode,
  selectSeason,
  selectSerie,
  setEpisodes,
  setSeasons,
  setSeries,
  setCategories,
  setSelectedNumberSeason,
} = seriesSlice.actions;
