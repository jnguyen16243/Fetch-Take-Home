import React, { useState } from "react";
import { Container, TextField, Button, Box, Paper, Typography, useTheme } from "@mui/material";
import { login } from "../api/dogApi.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { User } from "../types";

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({ name: "John Doe", email: "JohnDoe@gmail.com" });
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();
  const theme = useTheme(); 

  const handleSubmit = async () => {
    try {
      await login(user);
      setAuth();
      navigate("/search");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.secondary.main 
    }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h2" gutterBottom color="primary">
            fetch
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              required
              color="primary"
              label="Name"
              fullWidth
              variant="outlined"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <TextField
              required
              color="primary"
              label="Email"
              fullWidth
              variant="outlined"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
