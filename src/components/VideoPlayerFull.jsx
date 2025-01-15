import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectEpisode } from "../store/slices/seriesSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VideoPlayerFull = ({
  open,
  videoUrl,
  title,
  description,
  thumbnail_image,
  selectedSeasonNumber,
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(selectEpisode(null));
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Temporada {selectedSeasonNumber}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Box>
          <iframe
            src={videoUrl}
            width="100%"
            height="480px"
            allowFullScreen
          ></iframe>
          <Divider />
          <Typography
            sx={{ mt: 2 }}
            variant="h5"
            component="div"
            color="text.secondary"
          >
            {title}
          </Typography>
          <Typography sx={{ mt: 2, marginX: 2 }} variant="h6" component="div">
            {description}
          </Typography>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default VideoPlayerFull;
