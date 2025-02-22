import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Box, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import theme from "../theme";

const DogCard: React.FC = () => {
  const [favorited, setFavorited] = useState(false);
  const theme = useTheme();

  const handleFavoriteClick = () => {
    setFavorited((prev) => !prev);
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image="https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1620.jpg"
          alt="Flo"
        />
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
          }}
        >
           <FavoriteIcon sx={{ color: favorited ? theme.palette.primary.main : theme.palette.grey[500] }} />
        </IconButton>
      </Box>
        
      {/* Dog Details */}
      <CardContent>
        <Typography variant="h6" component="div">
          Flo
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Age:</strong> 12 years
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Breed:</strong> Chihuahua
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Zip Code:</strong> 85250
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DogCard;
