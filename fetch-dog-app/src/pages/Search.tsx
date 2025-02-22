import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { fetchBreeds } from "../api/dogApi.ts";
import { Dog } from "../types.ts";
import { Container, Typography, CircularProgress, List, ListItem, AppBar, Toolbar, IconButton, Button, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, useTheme, Slider, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Stack, Select, MenuItem, InputLabel, Card, CardMedia, CardContent } from "@mui/material";
import Grid from '@mui/material/Grid2';
import FavoriteIcon from "@mui/icons-material/Favorite";
import DogCard from "../components/DogCard.tsx";
const Search: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    if (isAuthenticated === null) return; //

  if (isAuthenticated === false) {
    navigate("/");
  } else {
    setLoading(false);
  }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "secondary.main" }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Fetch
          </Typography>
          <Button color="inherit" startIcon={<FavoriteIcon />}>
            Favorites
          </Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 3 }} id="search-section">
            <Paper style={{ padding: "16px" }}>
              <Typography variant="h6">Search</Typography>
              {/* Stack for vertical arrangement */}
              <Stack spacing={2} mt={2}>
                <TextField fullWidth label="Address" variant="outlined" />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Age"
                  //onChange={handleChange} update variables!
                  >
                    <MenuItem value={10}>Puppy</MenuItem>
                    <MenuItem value={20}>Young</MenuItem>
                    <MenuItem value={30}>Adult</MenuItem>
                    <MenuItem value={30}>Senior</MenuItem>
                  </Select>
                </FormControl>

                <TextField fullWidth label="Breed" variant="outlined" />
                <Button variant="contained" color="primary" fullWidth>
                  Search
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{xs:12, md:9}} id="dog-list">
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
