import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#300d38", // Fetch Purple
      light: "#5a1a69",
      dark: "#f6b156",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f8b95a", // Warm sunset orange
      light: "#fbcf62",
      dark: "#f6b156",
      contrastText: "#000000",
    },
    background: {
      default: "#FFFFFF", // Light yellow background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#090325",
      secondary: "#5a1a69",
    },
  },
  typography: {
    fontFamily: "'Bitter', serif",
    h1: {
      fontWeight: 900, // Extra bold for big titles
      fontSize: "3rem", // Adjust size as needed
    },
    h2: {
      fontWeight: 800, // Slightly less bold
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    body1: {
      fontWeight: 400, // Normal text weight
    },
    button: {
      textTransform: "none", // Keep button text normal case
      fontWeight: 700, // Make buttons bold
    },
  },
});

export default theme;
