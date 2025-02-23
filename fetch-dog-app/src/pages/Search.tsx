import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

import { Container, Typography, CircularProgress, Box, useTheme, FormControl, Stack, Select, MenuItem, InputLabel } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DogCard from "../components/DogCard.tsx";
import AppBarComponent from "../components/AppBarComponent.tsx";
import SearchFilters from "../components/Search/SearchFilters.tsx";
import { ageRanges } from "../constants.ts";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen.tsx";


const Search: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [selectedAgeLabel, setSelectedAgeLabel] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  // Convert selected label to min/max when making API request
    const selectedAgeRange = ageRanges.find((age) => age.label === selectedAgeLabel) || null;

  const handleBreedChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setSelectedBreeds(newValue);
  };
  useEffect(() => {
    if (isAuthenticated === null) return;
    if (isAuthenticated === false) {
      navigate("/");
    } else {      
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);



  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "secondary.main" }}>
      {loading && <LoadingScreen />} 
      <AppBarComponent></AppBarComponent>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 3 }} id="search-section">
            <SearchFilters
              selectedBreeds={selectedBreeds}
              setSelectedBreeds={setSelectedBreeds}
              selectedAgeLabel={selectedAgeLabel}
              setSelectedAgeLabel={setSelectedAgeLabel}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
            />
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
