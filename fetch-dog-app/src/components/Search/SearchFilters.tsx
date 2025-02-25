import React from "react";
import { Paper, Typography, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Autocomplete } from "@mui/material";
import { ageRanges, usStates } from "../../constants.ts";
import { useBreeds } from "../Breeds/BreedsFilter.hooks.ts";
import { SearchFiltersProps } from "../../types.ts";

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, setFilters }) => {
    const { breeds, loading } = useBreeds();

    const handleChange = <K extends keyof SearchFiltersProps["filters"]>(key: K, value: SearchFiltersProps["filters"][K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const convertAgeLabelToRange = (label: string) => {
        const selectedAgeRange = ageRanges.find((age) => age.label === label) || { label: "Default", min: 0, max: 10 };

        setFilters((prev) => ({
            ...prev,
            age: selectedAgeRange, 
        }));
    };

    return (
        <Paper sx={{ p: 2 }}>
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
                        value={filters.age.label} // Fix: Use `filters.age.label`
                        onChange={(e) => convertAgeLabelToRange(e.target.value)}
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
