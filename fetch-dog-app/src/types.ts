export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }
  
  export interface User {
    name: string;
    email: string;
  }
  export interface FiltersState {
    selectedBreeds: string[];
    city: string;
    state: string;
    age: AgeRange; 
  }
  export interface SearchFiltersProps {
      filters: {
          selectedBreeds: string[];
          city: string;
          state: string;
          age: AgeRange;
      };
      setFilters: React.Dispatch<React.SetStateAction<{
          selectedBreeds: string[];
          age: AgeRange;
          city: string;
          state: string;
      }>>;
  }
  export interface AgeRange {
    label: string;
    min: number;
    max: number;
  }
  