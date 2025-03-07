import React, { useMemo, useState } from "react";
import Grid from '@mui/material/Grid2';
import DogCard from "./DogCard.tsx";
import { Dog } from "../../types";
import { Button } from "@mui/material";

const DogList: React.FC<{ dogs: Dog[]; onFavoriteToggle: (dog: Dog) => void; favoritedDogs: Dog[] }> = ({
    dogs,
    onFavoriteToggle,
    favoritedDogs,
  }) => {

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");


    const sortedDogs = useMemo(() => {
        return [...dogs].sort((a, b) =>
            sortOrder === "asc" ? a.breed.localeCompare(b.breed) : b.breed.localeCompare(a.breed)
        );
    }, [dogs, sortOrder]);


    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button

                        variant="contained"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                        Sort by Breed: {sortOrder === "asc" ? "A-Z" : "Z-A"}
                    </Button>
                </Grid>
                {sortedDogs.map((dog) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dog.id}>

                        <DogCard
                            key={dog.id}
                            dog={dog}
                            isFavorited={favoritedDogs.some((favDog) => favDog.id === dog.id)}
                            onFavoriteToggle={onFavoriteToggle}
                        />
                    </Grid>
                ))}
                <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
                </Grid>
            </Grid>
        </>

    );
};

export default DogList;
