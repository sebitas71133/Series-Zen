import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../config/supabaseClient";

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    // fetchSeriesData: builder.query({
    //   async queryFn({ slug, season_number }) {
    //     try {
    //       // Obtener la serie
    //       const { data: serie, error: seriesError } = await supabase
    //         .from("SERIES")
    //         .select("*")
    //         .eq("slug", slug);

    //       if (seriesError) throw new Error(seriesError.message);
    //       if (!serie || serie.length === 0)
    //         throw new Error("Serie no encontrada.");

    //       const serieId = serie[0].id;

    //       // Obtener categorías
    //       const { data: categoriesData, error: categoriesError } =
    //         await supabase
    //           .from("SERIES_CATEGORIES")
    //           .select("categories_id")
    //           .eq("series_id", serieId);

    //       if (categoriesError) throw new Error(categoriesError.message);

    //       const categoryIds = categoriesData.map((item) => item.categories_id);

    //       const { data: seriesCategories, error: seriesCategoriesError } =
    //         await supabase.from("CATEGORIES").select("*").in("id", categoryIds);

    //       if (seriesCategoriesError)
    //         throw new Error(seriesCategoriesError.message);

    //       // Obtener temporadas
    //       const { data: seasons, error: seasonsError } = await supabase
    //         .from("SEASON")
    //         .select("*")
    //         .eq("series_id", serieId)
    //         .order("season_number", { ascending: true });

    //       if (seasonsError) throw new Error(seasonsError.message);

    //       if (!seasons || seasons.length === 0) {
    //         return {
    //           data: {
    //             serie: serie[0],
    //             season: null,
    //             episodes: [],
    //             seasons: [],
    //             categories: [],
    //           },
    //         };
    //       }

    //       // Obtener episodios de la temporada seleccionada
    //       const { data: episodes, error: episodesError } = await supabase
    //         .from("EPISODES")
    //         .select("*")
    //         .eq("season_id", seasons[season_number - 1].id)
    //         .order("episode_number", { ascending: true });

    //       if (episodesError) throw new Error(episodesError.message);

    //       return {
    //         data: {
    //           serie: serie[0],
    //           season: seasons[season_number - 1],
    //           episodes: episodes || [],
    //           seasons: seasons,
    //           categories: seriesCategories || [],
    //         },
    //       };
    //     } catch (error) {
    //       return {
    //         error: {
    //           status: "Error fetching data series",
    //           error: error.message,
    //         },
    //       };
    //     }
    //   },
    //   refetchOnMountOrArgChange: true,
    // }),

    // fetchSeriesData: builder.query({
    //   async queryFn({ slug, season_number }) {
    //     try {
    //       // Realizar una única consulta con relaciones
    //       const { data, error } = await supabase
    //         .from("SERIES")
    //         .select(
    //           `
    //             *,
    //             SERIES_CATEGORIES (categories_id),
    //             CATEGORIES (*),
    //             SEASON (*, EPISODES(*))
    //           `
    //         )
    //         .eq("slug", slug);

    //       if (error) throw error;

    //       if (!data || data.length === 0)
    //         throw new Error("Serie no encontrada.");

    //       const serie = data[0];
    //       //  const categories = serie.SERIES_CATEGORIES.map(item => item.categories_id);
    //       const seasons = serie.SEASON || [];
    //       const selectedSeason =
    //         seasons.find((season) => season.season_number === season_number) ||
    //         null;
    //       const episodes = selectedSeason?.EPISODES || [];

    //       return {
    //         data: {
    //           serie,
    //           season: selectedSeason,
    //           episodes,
    //           seasons,
    //           categories: serie.CATEGORIES || [],
    //         },
    //       };
    //     } catch (error) {
    //       return {
    //         error: {
    //           status: "Error fetching series data",
    //           error: error.message,
    //         },
    //       };
    //     }
    //   },
    //   refetchOnMountOrArgChange: true,
    // }),

    fetchAllSeriesData: builder.query({
      queryFn: async ({ all }) => {
        try {
          const { data: seriesData, error } = await supabase
            .from("SERIES")
            .select("*");

          if (error) throw error;

          return { data: seriesData };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      keepUnusedDataFor: 3600,
    }),

    fetchAllSerieData: builder.query({
      queryFn: async ({ slug }) => {
        try {
          const { data, error } = await supabase.rpc("get_serie_left_data", {
            slug_input: slug,
          });

          if (error) throw error;
          if (!data || data.length === 0) throw new Error(error.message);

          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      keepUnusedDataFor: 3600,
    }),
    // createEpisode: builder.mutation({
    //   async queryFn(newEpisode) {
    //     try {
    //       const { data, error } = await supabase
    //         .from("EPISODES")
    //         .insert(newEpisode);
    //       if (error) throw new Error(error.message);
    //       return { data };
    //     } catch (error) {
    //       return { error: { status: "CUSTOM_ERROR", error: error.message } };
    //     }
    //   },
    // }),
  }),
});

export const {
  useFetchSeriesDataQuery,
  useFetchAllSeriesDataQuery,
  useFetchAllSerieDataQuery,
} = seriesApi;
