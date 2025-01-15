import data from "../data/data.json";

export const getSeries = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data); // Simula una respuesta de la API
    }, 1000); // Simula un retraso de 1 segundo
  });
};

// Función para obtener una serie por su id
export const getSerieById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const serie = data.series.find((serie) => serie.id === id);
      resolve(serie);
    }, 1000);
  });
};

// Función para obtener los episodios de una temporada
export const getEpisodesBySeason = (serieId, seasonNumber) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const serie = data.series.find((serie) => serie.id === serieId);

      if (serie) {
        const season = serie.seasons.find(
          (season) => season.seasonNumber === seasonNumber
        );
        resolve(season ? season.episodes : []);
      } else {
        resolve([]);
      }
    }, 1000);
  });
};
