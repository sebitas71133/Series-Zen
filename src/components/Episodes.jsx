import React, { useEffect } from "react";
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
} from "@mui/material";
import VideoPlayer from "./VideoPlayer";

import {
  fetchEpisodesBySeason,
  fetchTemporadasBySerie,
  selectEpisode,
  selectSeason,
} from "../store/slices/seriesSlice";

const Episodes = (props) => {
  const { episodes, seasons, selectedEpisode, selectedSeason, selectedSerie } =
    useSelector((state) => state.series);

  const dispatch = useDispatch();
  const { slug } = props;
  console.log(slug);

  const handleSeasonChange = (event) => {
    const seasonId = event.target.value;

    const seasonSelected = seasons.find((season) => season.id === seasonId);
    console.log(seasonSelected);

    dispatch(selectSeason(seasonSelected));
    dispatch(
      fetchEpisodesBySeason({
        slug,
        selectedSeason: seasonSelected.season_number,
      })
    );
    console.log(selectedSeason);
  };

  const handleEpisodeClick = (episode) => {
    console.log(episode);

    dispatch(selectEpisode(episode));
  };

  const handleCloseVideo = () => {
    dispatch(selectEpisode(null));
  };

  useEffect(() => {
    dispatch(fetchEpisodesBySeason({ slug, selectedSeason }));
    dispatch(fetchTemporadasBySerie({ serieId: selectedSerie.id }));
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
        <Box>
          <Typography variant="h2" component="h2">
            Episodios
          </Typography>
          <FormControl sx={{ minWidth: 200, mt: 2 }}>
            <InputLabel>Temporada</InputLabel>
            <Select
              value={selectedSeason.season_number || ""}
              label="Temporada"
              onChange={handleSeasonChange}
            >
              {seasons.map((season) => (
                <MenuItem key={season.id} value={season.season_number}>
                  TEMPORADA {season.season_number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ textAlign: "center", m: 4, p: { md: 2, xs: 0 } }}>
          <Typography variant="h6" component="h6" color="text.primary">
            {selectedSeason.description}
          </Typography>
        </Box>
        <Box>
          {selectedSeason?.poster_image && (
            <CardMedia
              component="img"
              image={selectedSeason.poster_image}
              alt={`Póster de la temporada ${selectedSeason.season_number}`}
              sx={{ maxWidth: 200, borderRadius: 2 }}
            />
          )}
        </Box>
      </Box>

      <hr />
      <br />
      <br />
      <Grid2 container spacing={2}>
        {episodes.map((episode) => (
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
        ))}
      </Grid2>
      {selectedEpisode && (
        <VideoPlayer
          open={!!selectedEpisode}
          onClose={handleCloseVideo}
          videoUrl={selectedEpisode.video_url}
          title={`${selectedEpisode.episode_number} - ${selectedEpisode.title}`}
        />
      )}
    </Box>
  );
};

export default Episodes;
