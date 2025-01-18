import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllSeriesDataQuery } from "../services/seriesApi";
// import { fetchAllSeries } from "../store/slices/seriesSlice";

// const seriesData = {
//   accion: [
//     {
//       id: "samurai-jack",
//       title: "Samurai Jack",
//       image:
//         "https://res.cloudinary.com/ditbq608f/image/upload/v1736803927/IMAGENES/SERIES/Series_Samurai_Jack_q7ax9j.jpg",
//       path: "/series/samurai-jack",
//     },
//     {
//       id: "last-of-us",
//       title: "The Last of Us (HBO)",
//       image: "/placeholder.svg",
//       path: "/series/samurai-jack",
//     },
//     {
//       id: "succession",
//       title: "Succession (HBO)",
//       image: "/placeholder.svg",
//       path: "/series/samurai-jack",
//     },
//     {
//       id: "euphoria",
//       title: "Euphoria (HBO)",
//       image: "/placeholder.svg",
//       path: "/series/samurai-jack",
//     },
//   ],
//   comedia: [
//     {
//       id: "friends",
//       title: "Friends",
//       image: "/placeholder.svg",
//       path: "/series/samurai-jack",
//     },
//     {
//       id: "big-bang-theory",
//       title: "The Big Bang Theory",
//       image: "/placeholder.svg",
//       path: "/series/samurai-jack",
//     },
//     {
//       id: "rick-morty",
//       title: "Rick and Morty",
//       image: "/placeholder.svg",
//       path: "/series/samurai-jack",
//     },
//     {
//       id: "samurai-jack",
//       title: "Samurai Jack",
//       image:
//         "https://res.cloudinary.com/ditbq608f/image/upload/v1736803927/IMAGENES/SERIES/Series_Samurai_Jack_q7ax9j.jpg",
//       path: "/series/samurai-jack",
//     },
//   ],
// };

const SeriesSection = ({ title, series = [], onSeriesClick }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "white",
          mb: 3,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title}
      </Typography>
      <Grid2 container spacing={2}>
        {series.map((show) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={show.id}>
            <Card
              sx={{
                bgcolor: "transparent",
                boxShadow: "none",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
              onClick={() => onSeriesClick(show.slug)}
            >
              <CardMedia
                component="img"
                height="200"
                image={show.cover_image}
                alt={show.title}
                sx={{ borderRadius: 1, textAlign: "center" }}
              />
              <CardContent sx={{ p: 1 }}>
                <Typography variant="body1" color="white">
                  {show.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

const CatalogPage = () => {
  const navigate = useNavigate();

  const {
    data: series,
    isLoading,
    error,
  } = useFetchAllSeriesDataQuery({ all: true });

  const handleSeriesClick = (path) => {
    navigate(`/series/${path}`);
  };

  const dispatch = useDispatch();
  // const { series, loading } = useSelector((state) => state.series);

  // useEffect(() => {

  //   dispatch(fetchAllSeries({ all: true }));
  // }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        pt: 8,
        px: 4,
      }}
    >
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
        <SeriesSection
          title="Accion"
          series={series}
          onSeriesClick={handleSeriesClick}
        />
      )}
    </Box>
  );
};

export default CatalogPage;
