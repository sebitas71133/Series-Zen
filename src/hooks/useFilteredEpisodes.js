import { useMemo } from "react";

export const useFilteredEpisodes = (series, seasonNumber) => {
  const episodes = useMemo(() => {
    if (!series || !series[0]?.seasons) return [];
    const season = series[0].seasons.find(
      (season) => season.season_number === seasonNumber
    );
    return season?.episodes || [];
  }, [series, seasonNumber]);

  return { episodes };
};

export const useSelectedSeason = (series, seasonNumber) => {
  const season = useMemo(() => {
    if (!series || !series[0]?.seasons) return [];
    const season = series[0].seasons.find(
      (season) => season.season_number === seasonNumber
    );
    return season || [];
  }, [series, seasonNumber]);

  return { season };
};

export const useSortedSeasons = (series) => {
  const seasons = useMemo(() => {
    if (!series || !series[0]?.seasons) return [];

    const seasons = [...series[0].seasons].sort(
      (a, b) => a.season_number - b.season_number
    );
    return seasons || [];
  }, [series]);

  return { seasons };
};

// export const useSelectSeason = (series) => {
//   const seasons = useMemo(() => {
//     if (!series || !series[0]?.seasons) return [];

//     const seasons = [...series[0].seasons].sort(
//       (a, b) => a.season_number - b.season_number
//     );
//     return seasons || [];
//   }, [series]);

//   return { seasons };
// };
