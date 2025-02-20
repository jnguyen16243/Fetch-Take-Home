import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { fetchBreeds } from "../api/dogApi.ts";
import { Dog } from "../types.ts";
import { Container, Typography, CircularProgress, List, ListItem, AppBar, Toolbar,IconButton, Button, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, useTheme, Grid, Slider, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Search: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme(); 
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    setLoading(false);
    // fetchBreeds()
    //   .then((data) => {
    //     console.table(data)
    //     setBreeds(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => console.error("Error fetching dogs", error));
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

      <Container disableGutters sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to My App
        </Typography>
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "flex-start", 
            alignItems: "center", 
            width: "100%", 
          }}
        >
          <Box
            sx={{
              maxWidth: 400, 
              width: "100%", 
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Search
            </Typography>

            <TextField fullWidth label="Enter Address" variant="outlined" margin="normal" />
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel sx={{ color: "primary.main" }}>Age Category</FormLabel>
              <RadioGroup row>
                <FormControlLabel value="puppy" control={<Radio color="primary" />} label="Puppy" />
                <FormControlLabel value="young" control={<Radio color="primary" />} label="Young" />
                <FormControlLabel value="adult" control={<Radio color="primary" />} label="Adult" />
                <FormControlLabel value="senior" control={<Radio color="primary" />} label="Senior" />
              </RadioGroup>
            </FormControl>

            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Search
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default Search;
