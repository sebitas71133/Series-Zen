import { Box } from "@mui/material";
import React, { useState } from "react";
import Hero from "../components/Hero";
import Episodes from "../components/Episodes";
import { useParams } from "react-router-dom";
import {
  useFilteredEpisodes,
  useSelectedSeason,
  useSortedSeasons,
} from "../hooks/useFilteredEpisodes";
import { useFetchAllSerieDataQuery } from "../services/seriesApi";
import Loading from "../components/Loading";

const SeriesPage = () => {
  const { slug } = useParams(); // Obtén el slug de la URL

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const {
    data: series,
    isLoading,
    error,
  } = useFetchAllSerieDataQuery({ slug });
  const { episodes } = useFilteredEpisodes(series, selectedSeasonNumber);
  const { season } = useSelectedSeason(series, selectedSeasonNumber);
  const { seasons } = useSortedSeasons(series, selectedSeasonNumber);

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Box sx={{ minHeight: "100vh" }}>
          <Hero
            series={series}
            seasons={seasons}
            season={season}
            isLoading={isLoading}
          ></Hero>
          <Episodes
            slug={slug}
            selectedSeason={selectedSeason}
            setSelectedSeason={setSelectedSeason}
            selectedSeasonNumber={selectedSeasonNumber}
            setSelectedEpisode={setSelectedEpisode}
            setSelectedSeasonNumber={setSelectedSeasonNumber}
            episodes={episodes}
            seasons={seasons}
            season={season}
            isLoading={isLoading}
            selectedEpisode={selectedEpisode}
            error={error}
          />
        </Box>
      )}
    </>
  );
};

export default SeriesPage;
