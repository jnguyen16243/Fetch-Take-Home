import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

import { Box, Button, colors, Container, useTheme } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AppBarComponent from "../components/AppBarComponent.tsx";
import DogCard from "../components/DogCard.tsx";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen.tsx";
import SearchFilters from "../components/Search/SearchFilters.tsx";
import { ageRanges } from "../constants.ts";
interface FiltersState {
  selectedBreeds: string[];
  selectedAgeLabel: string;
  city: string;
  state: string;
}

const Search: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();


  const [filters, setFilters] = useState<FiltersState>({
    selectedBreeds: [],
    selectedAgeLabel: "",
    city: "",
    state: "",
  });

  // Convert selected label to min/max when making API request
  const selectedAgeRange = ageRanges.find((age) => age.label === filters.selectedAgeLabel) || null;

  useEffect(() => {
    if (isAuthenticated === null) return;
    if (isAuthenticated === false) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    console.log("Filters updated:", filters);
    console.log(selectedAgeRange);
  }, [filters]); // Runs whenever `filters` changes

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "secondary.main" }}>
      {loading && <LoadingScreen />}
      <AppBarComponent></AppBarComponent>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 3 }} id="search-section">
            <SearchFilters filters={filters} setFilters={setFilters} />
            <Box sx={{ mt: 2, width: "80%", mx:"auto" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: theme.palette.common.white, color: theme.palette.primary.main }}
              >
                Search
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }} id="dog-list">
            <Grid container spacing={3}>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
              <DogCard></DogCard>
            </Grid>
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
};
export default Search;
