import React from "react";
import { AppBar, Toolbar, Typography, Button, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AppBarComponent: React.FC = () => {
  const theme = useTheme();
  return (
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
  );
};

export default AppBarComponent;
