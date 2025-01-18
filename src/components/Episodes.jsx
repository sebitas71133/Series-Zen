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
import { useFetchSeriesDataQuery } from "../services/seriesApi";

const Episodes = (props) => {
  const {
    episodes,
    seasons,
    selectedEpisode,
    selectedSeason,
    selectedNumberSeason,
    selectedSerie,
    loading,
  } = useSelector((state) => state.series);

  const dispatch = useDispatch();
  const { slug } = props;

  const { data, isLoading, error } = useFetchSeriesDataQuery({
    slug: slug,
    season_number: selectedNumberSeason,
  });
  console.log(slug);
  console.log(data);
  console.log(selectedNumberSeason);
  console.log(selectedSeason);

  const handleSeasonChange = (event) => {
    const seasonNumber = event.target.value;
    const seasonSelected = data.seasons.find(
      (season) => season.season_number === seasonNumber
    );

    dispatch(selectSeason(seasonSelected));
    dispatch(setSelectedNumberSeason(seasonNumber));
    console.log(isLoading);
  };

  const handleEpisodeClick = (episode) => {
    dispatch(selectEpisode(episode));
  };

  useEffect(() => {
    if (data) {
      dispatch(setEpisodes(data.episodes));
      dispatch(selectSerie(data.serie));
      dispatch(setCategories(data.categories));

      // if (!selectedSeason) {
      //   console.log(selectedSeason);

      //   dispatch(selectSeason(data.seasons[0]));
      // } else {
      //   console.log(selectedSeason);
      //   dispatch(selectSeason(selectedSeason));
      // }
      console.log("data");
    }
    console.log(data);
  }, [data, dispatch, slug]);

  useEffect(() => {
    dispatch(setSelectedNumberSeason(1)); // Volvemos a colocar 1 por defecto para cargar toda la data
    dispatch(selectSeason(data?.seasons[0])); //Seleccionar la primera Temporada por defecto
  }, []);

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
                value={selectedSeason?.season_number || "1"}
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
                  data?.seasons?.map((season) => (
                    <MenuItem key={season.id} value={season.season_number}>
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
            {selectedSeason?.description}
          </Typography>
        </Box>
        <Box>
          {selectedSeason?.poster_image && (
            <CardMedia
              component="img"
              image={selectedSeason?.poster_image}
              alt={`Póster de la temporada ${selectedSeason?.season_number}`}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <CircularProgress size={50} />
          </Box>
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
        // <VideoPlayer
        //   open={!!selectedEpisode}
        //   onClose={handleCloseVideo}
        //   videoUrl={selectedEpisode.video_url}
        //   title={`${selectedEpisode.episode_number} - ${selectedEpisode.title}`}
        // />

        <VideoPlayerFull
          open={!!selectedEpisode}
          // onClose={handleCloseVideo}
          videoUrl={selectedEpisode.video_url}
          title={`${selectedEpisode.episode_number} - ${selectedEpisode.title}`}
          description={selectedEpisode.description}
          thumbnail_image={selectedEpisode.thumbnail_image}
          selectedSeasonNumber={selectedSeason.season_number}
        ></VideoPlayerFull>
      )}
    </Box>
  );
};

export default Episodes;
