import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { getEpisodes, getTemporadasBySerie } from "../../api/supabaseApi";

export const fetchEpisodesBySeason = createAsyncThunk(
  "seasons/fetchEpisodes",
  async ({ slug, selectedSeason }, { rejectWithValue }) => {
    console.log("Payload:", slug, selectedSeason); // Esto se debería mostrar ahora
    try {
      const { episodes, serie } = await getEpisodes(slug, selectedSeason); // Llamada a la API

      return { episodes, serie }; // Devuelve los episodios como resultado
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

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    series: [],
    selectedSerie: { id: 1 },
    seasons: [],
    selectedSeason: 1,
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
    },
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
    },
    selectEpisode: (state, action) => {
      state.selectedEpisode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodesBySeason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodesBySeason.fulfilled, (state, action) => {
        console.log(action.payload);

        state.loading = false;
        state.episodes = action.payload.episodes;
        state.selectedSerie = action.payload.serie;
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
} = seriesSlice.actions;
