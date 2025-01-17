import { supabase } from "../../services/supabaseClient";

// Funciones para interactuar con la API
export const loadSeriesData = async (slug, season_number) => {
  try {
    // Obtener la serie por su slug
    const { data: serie, error: seriesError } = await supabase
      .from("SERIES")
      .select("*")
      .eq("slug", slug);

    if (seriesError)
      throw new Error(`Error al obtener la serie: ${seriesError.message}`);
    if (!serie || serie.length === 0)
      throw new Error("No se encontró la serie con el slug proporcionado.");

    const serieId = serie[0].id;

    //OBTENEMOS LAS CATEGORIAS

    const { data: categoriesData, error: categoriesError } = await supabase
      .from("SERIES_CATEGORIES")
      .select("categories_id")
      .eq("series_id", serieId);

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError.message);
      return;
    }

    // Ahora `categoriesData` es un array de objetos, necesitas extraer los `categories_id`
    const categoryIds = categoriesData.map((item) => item.categories_id);

    // Luego puedes usarlo en la consulta a la tabla `CATEGORIES`
    const { data: seriesCategories, error: seriesCategoriesError } =
      await supabase.from("CATEGORIES").select("*").in("id", categoryIds);

    if (seriesCategoriesError) {
      console.error(
        "Error fetching series categories:",
        seriesCategoriesError.message
      );
      return;
    }

    console.log(seriesCategories);

    if (seriesCategoriesError)
      throw new Error(
        `Error al obtener las categorias: ${seriesCategoriesError.message}`
      );
    if (!seriesCategories || seriesCategories.length === 0)
      console.warn("No se encontró las categorias.");

    // END;

    const { data: seasons, error: seasonsError } = await supabase
      .from("SEASON")
      .select("*")
      .eq("series_id", serieId)
      .order("season_number", { ascending: true });

    if (seasonsError)
      throw new Error(`Error al obtener todas las temporadas: ${seasonsError}`);

    // Si no hay temporadas, devolvemos solo la serie
    if (!seasons || seasons.length === 0) {
      console.warn("No se encontró la temporada solicitada.");
      return {
        serie: serie[0],
        season: null,
        episodes: [],
        seasons: [],
        categories: [],
      };
    }
    //Por defecto 1ra temporada
    // const seasonId = seasons[0].id;

    // Obtener los episodios de la temporada
    const { data: episodes, error: episodesError } = await supabase
      .from("EPISODES")
      .select("*")
      .eq("season_id", seasons[season_number - 1].id)
      .order("episode_number", { ascending: true });

    if (episodesError)
      throw new Error(
        `Error al obtener los episodios: ${episodesError.message}`
      );

    // Retornar la serie, la temporada y los episodios
    return {
      serie: serie[0],
      season: seasons[season_number - 1],
      episodes: episodes || [],
      seasons: seasons,
      categories: seriesCategories || [],
    };
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return {
      serie: null,
      season: null,
      episodes: [],
      categories: [],
      error: error.message, // Devuelve el mensaje de error para manejarlo mejor
    };
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

//OBTENER TODAS LAS SERIES PARA EL CATALOGO
export const getSeries = async () => {
  try {
    const { data: seriesData, error } = await supabase
      .from("SERIES")
      .select("*");

    if (error) throw error;

    return { series: seriesData };
  } catch (error) {
    console.error("Error fetching series ");
    return null;
  }
};
