import React from "react";

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

import VideoPlayerFull from "./VideoPlayerFull";

import Loading from "./Loading";

const Episodes = ({
  selectedSeasonNumber,
  setSelectedSeasonNumber,
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

  //console.log(selectedEpisode);

  return (
    <Box sx={{ p: 4 }}>
      {/* TEMPORADAS */}
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
          <Typography
            sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
            variant="h6"
            component="h6"
            color="text.primary"
          >
            {season?.description}
          </Typography>
        </Box>
        <Box>
          {season?.poster_image && (
            <CardMedia
              component="img"
              image={season?.poster_image}
              alt={`Póster de la temporada ${season?.season_number}`}
              sx={{ maxWidth: 300, borderRadius: 2 }}
            />
          )}
        </Box>
      </Box>

      <hr />
      <br />
      <br />

      {/* EPISODIOS */}
      <Grid2 container spacing={2}>
        {isLoading ? (
          <Loading />
        ) : (
          episodes?.map((episode) => (
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={episode.id}>
              <Card
                sx={{
                  bgcolor: "background.paper",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  },
                  height: { xs: "250px", sm: "300px", md: "400px" },
                }}
                onClick={() => handleEpisodeClick(episode)}
              >
                <CardMedia
                  component="img"
                  height="auto"
                  image={episode.thumbnail_image}
                  alt={episode.title}
                />
                <CardContent>
                  <Typography
                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    variant="subtitle1"
                    component="div"
                    gutterBottom
                  >
                    {episode.episode_number}
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {episode.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }}
                    variant="body2"
                    color="text.primary"
                    mt={2}
                  >
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
          videoUrl={selectedEpisode.video_url}
          title={`${selectedEpisode.episode_number} - ${selectedEpisode.title}`}
          description={selectedEpisode.description}
          thumbnail_image={selectedEpisode.thumbnail_image}
          selectedSeasonNumber={selectedSeasonNumber}
          duration={selectedEpisode.duration}
          releaseDate={selectedEpisode.release_date}
          episodeNumber={selectedEpisode.episode_number}
        ></VideoPlayerFull>
      )}
    </Box>
  );
};

export default Episodes;
