import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Dog } from "../types";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Confetti from "react-confetti";

const MatchPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(true);
    const location = useLocation();
    const matchedDog: Dog | null = location.state?.matchedDog || null;
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === null) return;
        if (isAuthenticated === false) {
            navigate("/");
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (matchedDog) {
            const timer = setTimeout(() => setShowConfetti(false), 30000);
            return () => clearTimeout(timer);
        }
    }, [matchedDog]);

    if (!matchedDog) {
        return <Typography variant="h6">No match found. Try again!</Typography>;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #1a0a22, #3e0f28)", // Adds a rich gradient background
                textAlign: "center",
                padding: 3,
            }}
        >

            <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={300} />


            <Typography
                variant="h3"
                fontWeight="bold"
                color="white"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
                You Matched with {matchedDog.name}! <FavoriteIcon sx={{ color: "#ff4f8b" }} />
            </Typography>
            <Card
                sx={{
                    maxWidth: 420,
                    boxShadow: 6,
                    borderRadius: 4,
                    padding: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "2px solid #ff4f8b",
                }}
            >
                <CardMedia
                    component="img"
                    height="320"
                    image={matchedDog.img}
                    alt={matchedDog.name}
                    sx={{ borderRadius: 2 }}
                />
                <CardContent>
                    <Typography variant="h4" color="primary">
                        {matchedDog.name}
                    </Typography>
                    <Typography>
                        <strong>Breed:</strong> {matchedDog.breed}
                    </Typography>
                    <Typography>
                        <strong>Age:</strong> {matchedDog.age} years
                    </Typography>
                    <Typography>
                        <strong>Zip Code:</strong> {matchedDog.zip_code}
                    </Typography>
                </CardContent>
            </Card>
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        fontSize: "1.1rem",
                        paddingX: 3,
                        boxShadow: 3,
                    }}

                >
                    Learn More
                </Button>

                <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                        fontSize: "1.1rem",
                        paddingX: 3,
                        boxShadow: 3,
                        border: "2px solid #ff4f8b",
                        color: "#ff4f8b",
                    }}
                >
                    Share Match
                </Button>
            </Box>
        </Box>
    );
};

export default MatchPage;

