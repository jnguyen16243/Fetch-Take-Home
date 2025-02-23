import React from "react";
import { Paper, Typography, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button, Autocomplete } from "@mui/material";
import { ageRanges, usStates } from "../../constants.ts";
import { useBreeds } from "../Breeds/BreedsFilter.hooks.ts";

interface SearchFiltersProps {
    filters: {
        selectedBreeds: string[];
        selectedAgeLabel: string;
        city: string;
        state: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        selectedBreeds: string[];
        selectedAgeLabel: string;
        city: string;
        state: string;
    }>>;
}


const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, setFilters }) => {
    const { breeds, loading} = useBreeds();
    const handleChange = (key: keyof typeof filters, value: string | string[]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Paper style={{ padding: "16px" }}>
            <Typography variant="h6">Search</Typography>
            <Stack spacing={2} mt={2}>
                <TextField
                    fullWidth
                    label="City"
                    variant="outlined"
                    value={filters.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    slotProps={{ htmlInput: { maxLength: 50 } }}
                />
                <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                        value={filters.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                    >
                        {usStates.map((state) => (
                            <MenuItem key={state.code} value={state.code}>
                                {state.name} ({state.code})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Age</InputLabel>
                    <Select
                        label="Age"
                        value={filters.selectedAgeLabel}
                        onChange={(e) => handleChange("selectedAgeLabel", e.target.value)}
                    >
                        {ageRanges.map((range) => (
                            <MenuItem key={range.label} value={range.label}>
                                {range.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Autocomplete
                    multiple
                    options={breeds}
                    value={filters.selectedBreeds}
                    onChange={(_, newValue) => handleChange("selectedBreeds", newValue)}
                    loading={loading}
                    renderInput={(params) =>
                        <TextField {...params}
                            label="Select Dog Breed"
                            variant="outlined"
                            fullWidth
                        />
                    }
                />
            </Stack>
        </Paper>
    );
};

export default SearchFilters;
