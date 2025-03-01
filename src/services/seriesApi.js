import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../config/supabaseClient";

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
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
    //       const { data, error } = await supabasegi
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
