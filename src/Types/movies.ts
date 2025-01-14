export interface MovieDetails {
    id: number;
    title: string;
    year: number;
    genre: string[];
    rating: number;
    director: string;
    actors: string[];
    plot: string;
    poster: string;
    trailer: string | null;
    runtime: number;
    awards: string;
    country: string;
    language: string;
    boxOffice: string;
    production: string;
    website: string;
  }
  
  export interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    handlePrevious: () => void;
    handleNext: () => void;
    loading: boolean;
    currentMovies:MovieDetails[]
  }