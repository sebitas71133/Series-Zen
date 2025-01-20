import React from "react";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VideoPlayerFull = ({
  open,
  videoUrl,
  title,
  description,
  selectedSeasonNumber,
  setSelectedEpisode,
}) => {
  const handleClose = () => {
    setSelectedEpisode(null);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          "& .MuiPaper-root": {
            animation: "fadeIn 0.3s ease-in-out",
          },
        }}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Temporada {selectedSeasonNumber}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          <iframe
            src={videoUrl}
            width="100%"
            // height="480px"
            height="480px"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            allowFullScreen
          ></iframe>
          <Divider />
          <Typography
            sx={{ mt: 2 }}
            variant="h5"
            component="div"
            color="text.secondary"
            ml={2}
          >
            {title}
          </Typography>
          <Typography
            sx={{ mt: 2, marginX: 2, textAlign: "justify", lineHeight: 1.6 }}
            variant="h6"
            component="div"
          >
            {description}
          </Typography>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default VideoPlayerFull;
