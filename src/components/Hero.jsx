import React, { useEffect } from "react";
import { Box, Typography, Button, Chip, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const Hero = ({ series, seasons, isLoading }) => {
  // const { selectedSerie, seasons, categories } = useSelector(
  //   (state) => state.series
  // );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            position: "relative",
            minHeight: "80vh",
            backgroundImage: `url(${series[0]?.banner_image})`,

            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "flex-end",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)",
            },
          }}
        >
          <Box sx={{ position: "relative", p: 4, width: "100%" }}>
            <Stack spacing={2} sx={{ maxWidth: "800px" }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  flexWrap: "wrap",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  "& .MuiChip-root": {
                    margin: "10px",
                  },
                }}
              >
                <Chip
                  label={series[0]?.release_year || 2000}
                  variant="filled"
                />
                <Chip
                  label={`TEMPORADAS ${seasons.length || 1}`}
                  variant="filled"
                />

                {series[0]?.categories.map((category, index) => (
                  <Chip key={index} label={category} variant="outlined" />
                ))}
              </Stack>
              <Typography variant="h1" component="h1">
                {series[0]?.title}
              </Typography>

              <Box
                sx={{
                  backgroundColor: "rgba(255, 223, 0, 0.6)",
                  color: "white",
                  fontWeight: "bold",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  display: "inline-block",
                  alignSelf: "flex-start",
                }}
              >
                ⭐ {series[0]?.rating || "N/A"}
                <span style={{ fontSize: "0.8em" }}>/10</span>
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {series[0]?.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ width: "fit-content" }}
              >
                SUSCRÍBETE AHORA
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Hero;
