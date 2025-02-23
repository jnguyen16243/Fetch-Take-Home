import React, { useState } from "react";
import { useBreeds } from "./BreedsFilter.hooks.ts";
import BreedsInput from "./BreedsInput.tsx";


const BreedsFilter: React.FC = () => {
  const { breeds, loading, error } = useBreeds();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const handleBreedChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setSelectedBreeds(newValue);
  };

  if (loading) return <p>Loading breeds...</p>;
  if (error) return <p>Error: {error}</p>;

  return <BreedsInput options={breeds} value={selectedBreeds} onChange={handleBreedChange} />;
};

export default BreedsFilter;
