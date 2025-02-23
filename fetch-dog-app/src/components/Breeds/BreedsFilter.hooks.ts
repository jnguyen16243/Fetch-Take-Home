import { useState, useEffect } from "react";
import { fetchBreeds } from "../../api/dogApi.ts";

export const useBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const breedList = await fetchBreeds();
        setBreeds(breedList);
      } catch (error) {
        console.error("Error fetching breeds", error);
        setError("Failed to load breeds");
      } finally {
        setLoading(false);
      }
    };

    getBreeds();
  }, []);

  return { breeds, loading, error };
};
