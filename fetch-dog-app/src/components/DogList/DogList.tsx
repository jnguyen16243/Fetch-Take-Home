import React, { useState } from "react";
import Grid from '@mui/material/Grid2';
import DogCard from "../DogCard.tsx";
import { Dog } from "../../types";


interface DogListProps {
    dogs: Dog[];
  }
  
  const DogList: React.FC<DogListProps> = ({ dogs }) => {
    const [favoritedDogs, setFavoritedDogs] = useState<string[]>([]);
  
    const toggleFavorite = (dogId: string) => {
      setFavoritedDogs((prev) =>
        prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
      );
    };
  
  return (
    
      <Grid container spacing={3}>
        {dogs.map((dog) => (
          <DogCard 
            key={dog.id} 
            dog={dog} 
            isFavorited={favoritedDogs.includes(dog.id)}
            onFavoriteToggle={toggleFavorite} 
          />
        ))}
      </Grid>
  );
};

export default DogList;
