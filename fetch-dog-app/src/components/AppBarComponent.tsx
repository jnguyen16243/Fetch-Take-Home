import React from "react";
import { AppBar, Toolbar, Typography, Button, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from '@mui/icons-material/Pets';
import { useAuth } from "../context/AuthContext.tsx";
import { logout } from "../api/dogApi.ts";
import { useNavigate } from "react-router-dom";

interface AppBarProps {
    onFindMatch: () => void;
    onShowFavorites: () => void;
    showFavorites: boolean;
   
}
const AppBarComponent: React.FC<AppBarProps> = ({ onFindMatch, onShowFavorites, showFavorites }) => {
    const { logout: setAuth } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            setAuth();
            navigate("/");
        } catch (error) {
            navigate("/");
            console.error("logout failed", error);
        }
    };
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Fetch
                </Typography>
                <Button color="inherit" startIcon={<PetsIcon />} onClick={onFindMatch}>
                    Find Match
                </Button>
                <Button color="inherit" startIcon={showFavorites ? <PetsIcon /> : <FavoriteIcon />} onClick={onShowFavorites}>
                    {showFavorites ? "Show All Dogs" : "Favorites"}
                </Button>

                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
