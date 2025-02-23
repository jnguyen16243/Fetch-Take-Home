import React from "react";
import Lottie from "react-lottie-player";
import { Box, useTheme } from "@mui/material";
import dogLoadingAnimation from "../../assets/dogLoadingAnimation.json"

const LoadingScreen: React.FC = () => {
    const theme = useTheme();
  
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          //backgroundColor: theme.palette.background.default + "CC", // Use theme default background with transparency
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1300,
        }}
      >
        <Lottie loop animationData={dogLoadingAnimation} play style={{ width: 250, height: 250 }} />
      </Box>
    );
  };
  
  export default LoadingScreen;
