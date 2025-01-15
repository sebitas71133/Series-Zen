import { supabase } from "../../services/supabaseClient";

// Funciones para interactuar con la API
export const getEpisodes = async (slug, season_number) => {
  try {
    // Primero, obtenemos el 'series_id' de la serie
    console.log({ slug, season_number });

    const { data: serieId, error: seriesError } = await supabase
      .from("SERIES")
      .select("id")
      .eq("slug", slug); // Filtra por el título de la serie

    console.log(serieId[0].id);

    if (seriesError) throw seriesError;

    // Ahora, con el 'series_id', obtenemos la temporada
    const { data: seasonId, error: seasonsError } = await supabase
      .from("SEASON")
      .select("id")
      .eq("series_id", serieId[0].id) // Filtra por el 'series_id' de la serie
      .eq("season_number", season_number);

    if (seasonsError) throw seasonsError;

    // Finalmente, obtenemos los episodios para esa temporada y serie
    const { data: episodesData, error: episodesError } = await supabase
      .from("EPISODES")
      .select("*")
      .eq("season_id", seasonId[0].id) // Filtra por 'season_id'
      .order("episode_number", { ascending: true }); // Ordena por número de episodio

    if (episodesError) throw episodesError;

    //return episodesData;
    return {
      serie: { id: serieId[0].id, slug },
      season: { id: seasonId[0].id, season_number },
      episodes: episodesData,
    };
  } catch (error) {
    console.error("Error fetching episodes:", error.message);
    return null; // Retorna null en caso de error
  }
};

export const getEpisodeById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("episodes")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching episode with ID ${id}:`, error.message);
    return null;
  }
};

export const createEpisode = async (episode) => {
  try {
    const { data, error } = await supabase.from("episodes").insert([episode]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating episode:", error.message);
    return null;
  }
};

export const getTemporadasBySerie = async (serieId) => {
  try {
    const { data: seasonsData, error } = await supabase
      .from("SEASON")
      .select("*")
      .eq("series_id", serieId)
      .order("season_number", { ascending: true });
    if (error) throw error;

    return { seasons: seasonsData };
  } catch (error) {
    console.error("Error fetching temporadas by serieId:", error.message);
    return null;
  }
};
