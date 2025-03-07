import { useState, useEffect } from "react";
import { fetchBreeds } from "../../api/dogApi.ts";

export const useBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const breedList = await fetchBreeds();
        setBreeds(breedList);
      } catch (error) {
        setError("Failed to load breeds");
      } finally {
        setLoadingBreeds(false);
      }
    };

    getBreeds();
  }, []);

  return { breeds, loading: loadingBreeds, error };
};
