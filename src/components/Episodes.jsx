import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
//import VideoPlayer from "./VideoPlayer";

import {
  selectEpisode,
  selectSeason,
  selectSerie,
  setCategories,
  setEpisodes,
  setSelectedNumberSeason,
} from "../store/slices/seriesSlice";
import VideoPlayerFull from "./VideoPlayerFull";
import {
  useFetchAllSerieDataQuery,
  useFetchAllSeriesDataQuery,
  useFetchSeriesDataQuery,
} from "../services/seriesApi";
import {
  useFilteredEpisodes,
  useSelectedSeason,
  useSortedSeasons,
} from "../hooks/useFilteredEpisodes";
import Loading from "./Loading";

const Episodes = ({
  slug,
  selectedSeason,
  selectedSeasonNumber,
  setSelectedSeasonNumber,
  setSelectedSeason,
  setSelectedEpisode,
  episodes,
  seasons,
  season,
  isLoading,
  selectedEpisode,
  error,
}) => {
  const handleSeasonChange = (event) => {
    const seasonNumber = event.target.value;
    setSelectedSeasonNumber(seasonNumber);
  };

  const handleEpisodeClick = (episodeSelected) => {
    setSelectedEpisode(episodeSelected);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
          flexDirection: { xs: "column", md: "row" },
          textAlign: "center",
        }}
      >
        {!isLoading ? (
          <Box>
            <Typography variant="h2" component="h2">
              Episodios
            </Typography>
            <FormControl sx={{ minWidth: 200, mt: 2 }}>
              <InputLabel>Temporada</InputLabel>
              <Select
                value={selectedSeasonNumber || "1"}
                label="Temporada"
                onChange={handleSeasonChange}
                disabled={isLoading}
              >
                {isLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : error ? (
                  <MenuItem disabled>Error: {error?.message}</MenuItem>
                ) : (
                  seasons.map((season) => (
                    <MenuItem
                      key={season.season_id}
                      value={season.season_number}
                    >
                      TEMPORADA {season.season_number}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        )}
        <Box sx={{ textAlign: "center", m: 4, p: { md: 2, xs: 0 } }}>
          <Typography variant="h6" component="h6" color="text.primary">
            {season?.description}
          </Typography>
        </Box>
        <Box>
          {season?.poster_image && (
            <CardMedia
              component="img"
              image={season?.poster_image}
              alt={`Póster de la temporada ${season?.season_number}`}
              sx={{ maxWidth: 200, borderRadius: 2 }}
            />
          )}
        </Box>
      </Box>

      <hr />
      <br />
      <br />
      <Grid2 container spacing={2}>
        {isLoading ? (
          <Loading />
        ) : (
          episodes?.map((episode) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={episode.id}>
              <Card
                sx={{
                  bgcolor: "background.paper",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
                onClick={() => handleEpisodeClick(episode)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={episode.thumbnail_image}
                  alt={episode.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    {episode.episode_number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {episode.title}
                  </Typography>
                  <Typography variant="body2" color="text.primary" mt={2}>
                    {episode.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))
        )}
      </Grid2>
      {selectedEpisode && (
        <VideoPlayerFull
          open={!!selectedEpisode}
          setSelectedEpisode={setSelectedEpisode}
          // onClose={handleCloseVideo}
          videoUrl={selectedEpisode.video_url}
          title={`${selectedEpisode.episode_number} - ${selectedEpisode.title}`}
          description={selectedEpisode.description}
          thumbnail_image={selectedEpisode.thumbnail_image}
          selectedSeasonNumber={selectedSeasonNumber.season_number}
        ></VideoPlayerFull>
      )}
    </Box>
  );
};

export default Episodes;
