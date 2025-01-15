import React from "react";
import { Box, Typography, Button, Chip, Stack } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "80vh",
        backgroundImage:
          "url('https://res.cloudinary.com/ditbq608f/image/upload/v1736804023/IMAGENES/SERIES/Samuria-banner_iomi3u.avif')",
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
            <Chip label="2002" variant="outlined" />
            <Chip label="5 TEMPORADAS" variant="outlined" />
            <Chip label="ANIMACIÓN PARA ADULTOS" variant="outlined" />
            <Chip label="ACCIÓN" variant="outlined" />
          </Stack>
          <Typography variant="h1" component="h1">
            Samurai Jack
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Cuando una fuerza maligna destruye la Tierra, un joven guerrero
            samurái viaja al futuro. Los nativos lo ayudan a volver al pasado
            para prevenirlo.
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
  );
};

export default Hero;
