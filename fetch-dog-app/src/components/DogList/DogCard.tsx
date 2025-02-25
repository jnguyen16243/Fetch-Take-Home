import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Card, CardContent, CardMedia, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { Dog } from "../../types";

interface DogCardProps {
  dog: Dog;
  isFavorited: boolean;
  onFavoriteToggle: (dog: Dog) => void;
  isLoading?: boolean;
}

const DogCard: React.FC<DogCardProps> = ({ dog, isFavorited, onFavoriteToggle }) => {
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: 300, height: 350, display: "flex", flexDirection: "column", boxShadow: 3, borderRadius: 2 }}>
      <Box sx={{ position: "relative", height: 200 }}>
        <CardMedia
          component="img"
          image={dog.img}
          alt={dog.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <IconButton
          onClick={() => {
            onFavoriteToggle(dog);
          }}
            
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
          }}
        >
          <FavoriteIcon sx={{ color: isFavorited ? theme.palette.primary.main : theme.palette.grey[500] }} />
        </IconButton>
      </Box>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Typography variant="h6">{dog.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Age:</strong> {dog.age} years
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Breed:</strong> {dog.breed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Zip Code:</strong> {dog.zip_code}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DogCard;
