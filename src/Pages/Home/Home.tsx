import React, { useEffect, useState } from "react";
import { listMovies } from "../../api/movieApi.ts";
import Loader from "../../Components/Common/Loader.tsx";
import SearchBar from "../../Components/Movies/SearchBar.tsx";
import { useNavigate } from "react-router-dom";
import { Calendar, Heart, Star } from "lucide-react";
import Pagination from "../../Components/Movies/Pagination.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store.ts";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8); // Define how many movies per page
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.currentUser);// Get current user from Redux

  const fetchMovies = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      const { data } = await listMovies();
      setMovies(data.length > 0 ? data : []); // Update movies state
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // Ensure to set empty if there's an error
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies when the component is mounted
  }, []);

  // Pagination calculations: Determine which movies to display based on the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies
    .filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by search query
    .filter((movie) => (selectedGenre ? movie.genre.includes(selectedGenre) : true))  // Filter by genre if selected
    .slice(indexOfFirstMovie, indexOfLastMovie); // Slice the movies for pagination

     // Handle previous page click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrease page number if not on the first page
    }
  };

   // Handle next page click
  const handleNext = () => {
    if (currentPage * moviesPerPage < movies.length) {
      setCurrentPage(currentPage + 1); // Increase page number if not on the last page
    }
  };

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  // Handle genre change
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1); // Reset to page 1 when genre is changed
  };

  // Function to add or remove a movie from the favorites list
  const toggleFavorite = (movie) => {
    // Check if the movie is already in the favorites list
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    let updatedFavorites;
    if (isFavorite) {
      // If the movie is already a favorite, remove it
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      // If the movie is not a favorite, add it to the list
      updatedFavorites = [...favorites, movie];
    }
    // Update the favorites state with the new list
    setFavorites(updatedFavorites);
    // Save the updated favorites list to localStorage with the user-specific key
    localStorage.setItem(`favorites_${user?.email}`, JSON.stringify(updatedFavorites));
  };

  // Load favorites from localStorage when the component mounts (runs only once)
  useEffect(() => {
    const storedFavorites = localStorage.getItem(`favorites_${user?.email}`);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [user?.email]); // Re-run when userEmail changes

  // If still loading, show the loading spinner
  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Search Bar Component */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenre={selectedGenre}
        handleGenreChange={handleGenreChange}
      />

      {/* Movies Grid */}
      {!loading && currentMovies && currentMovies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
          {currentMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="aspect-w-2 aspect-h-3 relative overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">{movie.title}</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="w-20 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Release:
                    </span>
                    <span className="font-medium text-gray-800">{movie.year}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="w-20 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Rating:
                    </span>
                    <span className="font-medium text-gray-800">{movie.rating}</span>
                  </p>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(movie);
                  }}
                  className={`mt-2 p-2 rounded-lg ${
                    favorites.some((fav) => fav.id === movie.id)
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Heart className="w-5 h-5 inline-block" />
                  {favorites.some((fav) => fav.id === movie.id) ? "Unfavorite" : "Favorite"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !loading && currentMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur animate-pulse" />
            <div className="relative bg-white rounded-lg p-8 shadow-xl">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gray-100 rounded-full animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clapperboard"
                  >
                    <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
                    <path d="m6.2 5.3 3.1 3.9" />
                    <path d="m12.4 3.4 3.1 4" />
                    <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">No Movies Found</h3>
                <p className="text-gray-600 text-center max-w-sm">
                  Looks like our movie collection is empty at the moment. Check back later for new
                  additions!
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={movies.length}
        itemsPerPage={moviesPerPage}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        loading={loading}
        currentMovies={currentMovies}
      />
    </div>
  );
};

export default Home;
