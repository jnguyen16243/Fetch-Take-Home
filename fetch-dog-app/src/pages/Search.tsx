import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

import { Box, Button, CircularProgress, Container, useTheme } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AppBarComponent from "../components/AppBarComponent.tsx";
import DogCard from "../components/DogCard.tsx";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen.tsx";
import SearchFilters from "../components/Search/SearchFilters.tsx";
import { AgeRange } from "../constants.ts";
import { searchDogs } from "../api/dogApi.ts";
import { Dog } from "../types.ts";
import DogList from "../components/DogList/DogList.tsx";

export interface FiltersState {
  selectedBreeds: string[];
  city: string;
  state: string;
  age: AgeRange; 
}

const Search: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [favoritedDogs, setFavoritedDogs] = useState<Dog[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);


  const [filters, setFilters] = useState<FiltersState>({
    selectedBreeds: [],
    city: "",
    state: "",
    age: { label: "", min: 0, max: 10 },
  });


  useEffect(() => {
    if (isAuthenticated === null) return;
    if (isAuthenticated === false) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);
  // useEffect(()=>{
  //   console.log("from cursor", from)
  //   console.table(dogs)
  // },[from, dogs]);

  const handleSearchDogs = async () => {
    try {
      setLoading(true);
      const response = await searchDogs(filters);
  
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
  
      setDogs(response.dogs);
      setFrom(response.fromCursor)
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dogs:", error);
      setLoading(false);
    }
  };
  const handleFetchMoreDogs = async () => {
    if (!from ||from === '0' || loading) return; // Stop if no more results or already loading
  
    try {
      setLoading(true);
      const response = await searchDogs(filters, from);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      setDogs((prevDogs) => [...prevDogs, ...response.dogs]); 
      setFrom(response.fromCursor); // Update next query for pagination
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching more dogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!from) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleFetchMoreDogs();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [from, loading]);

  const handleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "secondary.main" }}>
      {loading && <LoadingScreen/>}
      <AppBarComponent onShowFavorites={handleShowFavorites} showFavorites={showFavorites} />

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 3 }} id="search-section">
            <SearchFilters filters={filters} setFilters={setFilters} />
            <Box sx={{ mt: 2, width: "80%", mx:"auto" }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSearchDogs}
                sx={{ backgroundColor: theme.palette.common.white, color: theme.palette.primary.main }}
              >
                Search
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }} sx = {{flexGrow: 1}}id="dog-list">
            <DogList dogs={dogs} />
            <div ref={loadMoreRef} style={{ height: 20, marginBottom: 40 }} />
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
};
export default Search;
