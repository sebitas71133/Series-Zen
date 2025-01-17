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
  CircularProgress,
} from "@mui/material";
//import VideoPlayer from "./VideoPlayer";

import {
  fetchLoadSeriesData,
  selectEpisode,
} from "../store/slices/seriesSlice";
import VideoPlayerFull from "./VideoPlayerFull";

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

  const handleSeasonChange = (event) => {
    const seasonNumber = event.target.value;
    //dispatch(setSelectedNumberSeason(seasonNumber));
    const seasonSelected = seasons.find(
      (season) => season.season_number === seasonNumber
    );

    console.log(seasonSelected);

    dispatch(
      fetchLoadSeriesData({
        slug,
        selectedNumberSeason: seasonNumber,
      })
    );
  };

  const handleEpisodeClick = (episode) => {
    dispatch(selectEpisode(episode));
  };

  //UseEffect que se realiza solo 1 vez al iniciar el componente
  useEffect(() => {
    dispatch(fetchLoadSeriesData({ slug, selectedNumberSeason: 1 }));
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
              value={selectedSeason?.season_number || ""}
              label="Temporada"
              onChange={handleSeasonChange}
              disabled={loading}
            >
              {loading ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                seasons.map((season) => (
                  <MenuItem key={season.id} value={season.season_number}>
                    TEMPORADA {season.season_number}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
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
        {loading ? (
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
          episodes.map((episode) => (
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
