import React from "react";
import { Paper, Typography, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import BreedsFilter from "../Breeds/BreedsFilter.tsx";
import { usStates } from "../../constants.ts";

interface SearchFiltersProps {
    selectedBreeds: string[];
    setSelectedBreeds: (breeds: string[]) => void;
    selectedAgeLabel: string;
    setSelectedAgeLabel: (label: string) => void;
    city: string;
    setCity: (city: string) => void;
    state: string;
    setState: (state: string) => void;
}

const ageRanges = [
    { label: "Puppy", min: 0, max: 2 },
    { label: "Young", min: 2, max: 5 },
    { label: "Adult", min: 5, max: 10 },
    { label: "Senior", min: 10, max: 25 },
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
    selectedBreeds,
    setSelectedBreeds,
    selectedAgeLabel,
    setSelectedAgeLabel,
    city,
    setCity,
    state,
    setState,
}) => {
    const handleAgeChange = (event: any) => {
        setSelectedAgeLabel(event.target.value);
    };
    const handleStateChange = (event: any) => {
        setState(event.target.value);
    };

    return (
        <Paper style={{ padding: "16px" }}>
            <Typography variant="h6">Search</Typography>
            <Stack spacing={2} mt={2}>
                <TextField fullWidth label="City" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} slotProps={{ htmlInput: { maxLength: 50 } }} />
                <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select value={state} onChange={handleStateChange}>
                        {usStates.map((state) => (
                            <MenuItem key={state.code} value={state.code}>
                                {state.name} ({state.code})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Age</InputLabel>
                    <Select label="Age" value={selectedAgeLabel} onChange={handleAgeChange}>
                        {ageRanges.map((range) => (
                            <MenuItem key={range.label} value={range.label}>
                                {range.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <BreedsFilter />
                <Button variant="contained" color="primary" fullWidth>
                    Search
                </Button>
            </Stack>
        </Paper>
    );
};

export default SearchFilters;
