import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "./AuthComponent";

const LoginPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box flexGrow={0}>
          <Box sx={{ mb: 5 }}>
            <Typography variant="body" color="text.primary">
              PAGINA DE LOGIN
            </Typography>
          </Box>
          <Auth />
          <Link to="/">
            <Button variant="contained" color="primary">
              Regresar
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
