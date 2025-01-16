import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import {
  getEpisodes,
  getSeries,
  getTemporadasBySerie,
} from "../../api/supabaseApi";

export const fetchEpisodesBySeason = createAsyncThunk(
  "seasons/fetchEpisodes",
  async ({ slug, selectedNumberSeason }, { rejectWithValue }) => {
    try {
      const { episodes, serie, season, seasons } = await getEpisodes(
        slug,
        selectedNumberSeason
      ); // Llamada a la API

      return { episodes, serie, seasons, season }; // Devuelve los episodios como resultado
    } catch (error) {
      return rejectWithValue(error.message); // Maneja errores
    }
  }
);

export const fetchTemporadasBySerie = createAsyncThunk(
  "seasons/fetchTemporadas",
  async ({ serieId }, { rejectWithValue }) => {
    try {
      const { seasons } = await getTemporadasBySerie(serieId); // Llamada a la API
      return { seasons }; // Devuelve los episodios como resultado
    } catch (error) {
      return rejectWithValue(error.message); // Maneja errores
    }
  }
);

export const fetchAllSeries = createAsyncThunk(
  "series/fetchAllSeries",
  async ({ all }, { rejectWithValue }) => {
    try {
      const { series } = await getSeries();

      return { series };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    series: [],
    selectedSerie: { id: 1 },
    seasons: [],
    selectedSeason: {},
    selectedNumberSeason: 0,
    episodes: [],
    selectedEpisode: null,
    loading: false,
    error: null,
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

      state.selectedNumberSeason = action.payload.season_number;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodesBySeason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodesBySeason.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = action.payload.episodes;
        state.selectedSerie = action.payload.serie;
        state.selectedSeason = action.payload.season;
        state.seasons = action.payload.seasons;
      })
      .addCase(fetchEpisodesBySeason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTemporadasBySerie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemporadasBySerie.fulfilled, (state, action) => {
        state.loading = false;
        state.seasons = action.payload.seasons; // Actualiza las temporadas
        state.selectedSeason = action.payload.seasons[0]; //Iniciar con la temporada 1.
      })
      .addCase(fetchTemporadasBySerie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Maneja el error
      })
      .addCase(fetchAllSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSeries.fulfilled, (state, action) => {
        state.loading = false;

        state.series = action.payload.series; // Actualiza las temporadas
      })
      .addCase(fetchAllSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Maneja el error
      });
  },
});

export const seriesReducer = seriesSlice.reducer;
export const {
  selectEpisode,
  selectSeason,
  selectSerie,
  setEpisodes,
  setSeasons,
  setSeries,
  setSelectedNumberSeason,
} = seriesSlice.actions;
