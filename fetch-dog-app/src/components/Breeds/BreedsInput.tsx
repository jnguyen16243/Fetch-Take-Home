import React from "react";
import { Autocomplete, TextField } from "@mui/material";

interface BreedsInputProps {
  options: string[];
  value: string[];
  onChange: (event: React.SyntheticEvent, newValue: string[]) => void;
}

const BreedsInput: React.FC<BreedsInputProps> = ({ options, value, onChange }) => {
  return (
    <Autocomplete
      multiple
      options={options}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label="Select Dog Breed" variant="outlined" fullWidth />}
    />
  );
};

export default BreedsInput;
