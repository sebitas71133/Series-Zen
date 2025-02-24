import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Slide from "@mui/material/Slide";
import { Box, CardMedia } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VideoPlayerFull = ({
  open,
  videoUrl,
  title,
  description,
  selectedSeasonNumber,
  episodeNumber,
  duration,
  releaseDate,
  thumbnail_image,
  setSelectedEpisode,
}) => {
  const handleClose = () => {
    setSelectedEpisode(null);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        "& .MuiPaper-root": {
          background: "linear-gradient(to bottom, #141e30, #243b55)",
          color: "white",
        },
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, fontWeight: "bold" }} variant="h6">
            Temporada {selectedSeasonNumber} - Episodio {episodeNumber}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          p: 3,
        }}
      >
        <iframe
          src={videoUrl}
          width="100%"
          height="500px"
          style={{
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
          }}
          allowFullScreen
        ></iframe>
        <Typography
          sx={{
            mt: 3,
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 2,
            mx: 4,
            textAlign: "justify",
            lineHeight: 1.6,
            opacity: 0.8,
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 2,
            opacity: 0.7,
          }}
        >
          <AccessTimeIcon sx={{ verticalAlign: "middle", mr: 0.5 }} />
          <Typography variant="body2">Duración: {duration} min</Typography>
          <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 0.5 }} />
          <Typography variant="body2">Estreno: {releaseDate}</Typography>
        </Box>

        <CardMedia
          component="img" // Especifica que es una imagen
          image={thumbnail_image}
          alt={title}
          sx={{
            marginTop: 2,
            width: "100%",
            maxHeight: 200,
            objectFit: "contain",
            borderRadius: 2,
            marginBottom: 2,
          }}
        />
      </Box>
    </Dialog>
  );
};

export default VideoPlayerFull;
