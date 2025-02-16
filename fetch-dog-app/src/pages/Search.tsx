import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { fetchBreeds } from "../api/dogApi.ts";
import { Dog } from "../types.ts";
import { Container, Typography, CircularProgress, List, ListItem } from "@mui/material";


const Search: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    fetchBreeds()
      .then((data) => {
        console.table(data)
        setBreeds(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching dogs", error));
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Dogs
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {breeds.map((breed, index) => (
            <ListItem key={index}>{breed}</ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};
export default Search;
