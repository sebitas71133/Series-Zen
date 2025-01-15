import { Box } from "@mui/material";
import React from "react";
import Hero from "../components/Hero";
import Episodes from "../components/Episodes";
import { useParams } from "react-router-dom";

const SeriesPage = () => {
  const { slug } = useParams(); // Obtén el slug de la URL

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Hero></Hero>
      <Episodes slug={slug}></Episodes>
    </Box>
  );
};

export default SeriesPage;
