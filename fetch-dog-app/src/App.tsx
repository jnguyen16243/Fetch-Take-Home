import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme.ts"; 
import { AuthProvider } from "./context/AuthContext.tsx";
import Login from "./pages/Login.tsx";
import Search from "./pages/Search.tsx";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Ensures consistent background & typography */}
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </AuthProvider>
  </ThemeProvider>
  );
};

export default App;
