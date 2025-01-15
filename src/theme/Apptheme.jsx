import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

const Apptheme = ({ children }) => {
  let { darkMode } = useSelector((state) => state.theme);
  darkMode = !darkMode;

  //   const darkMode = true;
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#00ffff" : "#ff00ff",
      },
      secondary: {
        main: darkMode ? "#ff9100" : "#00e5ff",
      },
      background: {
        default: darkMode ? "#121212" : "#f0f0f0",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
        secondary: darkMode ? "#b3e5fc" : "#311b92",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Apptheme;
