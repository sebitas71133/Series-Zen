import React from "react";
import { Dialog, DialogContent } from "@mui/material";

const VideoPlayer = ({ open, onClose, videoUrl, title }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <iframe
          src={videoUrl}
          width="100%"
          height="480px"
          allowFullScreen
        ></iframe>
        <h4>{title}</h4>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
