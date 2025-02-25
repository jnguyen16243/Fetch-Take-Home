import { SearchHooks } from "./SearchPage.hooks.ts"; //Goes first
import { Box, Button,  Container, useTheme } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AppBarComponent from "../../components/AppBarComponent.tsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.tsx";
import SearchFilters from "../../components/Search/SearchFilters.tsx";

import DogList from "../../components/DogList/DogList.tsx";

import React from "react";

const Search: React.FC = () => {
  const theme = useTheme();
  const {
    loading,
    dogs,
    filters,
    setFilters,
    favoritedDogs,
    toggleFavorite,
    showFavorites,
    handleShowFavorites,
    handleFindMatch,
    handleSearchDogs,
    loadMoreRef,
  } = SearchHooks();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "secondary.main" }}>
      {loading && <LoadingScreen/>}
      <AppBarComponent onFindMatch={handleFindMatch} onShowFavorites={handleShowFavorites} showFavorites={showFavorites} />

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 3 }} id="search-section">
            <SearchFilters filters={filters} setFilters={setFilters} />
            <Box sx={{ mt: 2, width: "80%", mx:"auto" }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSearchDogs}
                sx={{ backgroundColor: theme.palette.common.white, color: theme.palette.primary.main }}
              >
                Search
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }} sx = {{flexGrow: 1}}id="dog-list">
          <DogList
              dogs={showFavorites ? favoritedDogs : dogs} // Show only favorited dogs if toggled
              onFavoriteToggle={toggleFavorite}
              favoritedDogs={favoritedDogs}
            />
            {!showFavorites && <div ref={loadMoreRef} style={{ height: 20, marginBottom: 40 }} />}
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
};
export default Search;
