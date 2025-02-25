import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#300d38", 
      light: "#5a1a69",
      dark: "#f6b156",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f8b95a",
      light: "#FFFFFF",
      dark: "#f6b156",
      contrastText: "#000000",
    },
    background: {
      default: "#FFFFFF", 
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
      fontWeight: 900,
      fontSize: "3rem", 
    },
    h2: {
      fontWeight: 800, 
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    body1: {
      fontWeight: 400, 
    },
    button: {
      textTransform: "none", 
      fontWeight: 700, 
    },
  },
});

export default theme;
