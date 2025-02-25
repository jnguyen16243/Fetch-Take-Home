import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchDogs, matchDog } from "../../api/dogApi.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import { Dog, FiltersState } from "../../types";


export const SearchHooks = () => {
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [favoritedDogs, setFavoritedDogs] = useState<Dog[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FiltersState>({
    selectedBreeds: [],
    city: "",
    state: "",
    age: { label: "", min: 0, max: 10 },
  });

  useEffect(() => {
    if (isAuthenticated === null) return;
    if (!isAuthenticated) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);
  //Get dogs on load
  useEffect(() => {
    handleSearchDogs();
  }, []);
  //TODO: REMOVE 
  useEffect(() => {
    console.table(favoritedDogs);
  }, [from, favoritedDogs]);

  const handleSearchDogs = async () => {
    try {
      setLoading(true);
      const response = await searchDogs(filters);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDogs(response.dogs);
      setFrom(response.fromCursor);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dogs:", error);
      setLoading(false);
    }
  };

  const handleFetchMoreDogs = async () => {
    if (!from || from === "0" || loading) return;
    try {
      setLoading(true);
      const response = await searchDogs(filters, from);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDogs((prevDogs) => [...prevDogs, ...response.dogs]);
      setFrom(response.fromCursor);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching more dogs:", error);
      setLoading(false);
    }
  };
  //Infinite Scroll, BUG: It will sometimes repeatedly fetch 
  useEffect(() => {
    if (!from) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleFetchMoreDogs();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [from, loading]);

 

  const toggleFavorite = (dog: Dog) => {
    setFavoritedDogs((prev) =>
      prev.some((favDog) => favDog.id === dog.id)
        ? prev.filter((favDog) => favDog.id !== dog.id) // Remove if already favorited
        : [...prev, dog] // Add to favorites
    );
  };
  //Match Functions 
  const handleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  const handleFindMatch = async () => {
    if (favoritedDogs.length === 0) {
      alert("You need to favorite at least one dog before finding a match!");
      return;
    }

    try {
      const matchedDogId = await matchDog(favoritedDogs.map((dog) => dog.id));
      const matchedDog = favoritedDogs.find((fav) => fav.id === matchedDogId);
      
      navigate("/match", { state: { matchedDog } });
    } catch (error) {
      console.error("Error finding match:", error);
      alert("Something went wrong. Please try again!");
    }
  };

  return {
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
  };
};
