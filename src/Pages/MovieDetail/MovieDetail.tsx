import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/movieApi.ts";
import { MovieDetails } from "../../Types/movies.ts";
import Loader from "../../Components/Common/Loader.tsx";
import DetailItem from "../../Components/Movies/DetailItem.tsx";
import { Award, Film, Globe, LinkIcon, Users } from "lucide-react";

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const response = await getMovie(id);
      if (response) {
        setMovieDetails(response?.data);
      }
    } catch (error) {
      console.error("Error fetching movie details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) return <Loader />;
  if (!movieDetails) return <div>No movie details found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Poster Section */}
        <div className="relative group">
          <div className="aspect-[2/3] overflow-hidden rounded-2xl shadow-xl">
            <img
              src={movieDetails?.poster}
              alt={movieDetails?.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div/>
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          {/* Title and Basic Info */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-800">{movieDetails?.title}</h2>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
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
                  className="lucide lucide-clock"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{movieDetails?.runtime} min</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
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
                  className="lucide lucide-star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
                <span>{movieDetails?.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                {/* <Film size={20} /> */}
                <span>{movieDetails?.year}</span>
              </div>
            </div>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {movieDetails?.genre&&movieDetails?.genre.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm
                  hover:bg-indigo-100 transition-colors duration-200"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Plot */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">Plot</h3>
            <p className="text-gray-600 leading-relaxed">{movieDetails?.plot}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailItem icon={Users} label="Director" value={movieDetails?.director} />
            <DetailItem icon={Globe} label="Country" value={movieDetails?.country} />
            <DetailItem icon={Award} label="Awards" value={movieDetails?.awards} />
            <DetailItem icon={Film} label="Production" value={movieDetails?.production} />
          </div>

          {/* Cast Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Cast</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {movieDetails?.actors&&movieDetails.actors.map((actor, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100
                    transition-colors duration-200"
                >
                  {actor}
                </div>
              ))}
            </div>
          </div>

          {/* Trailer Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              {/* <Play size={20} /> */}
              Trailer
            </h3>
            {movieDetails?.trailer ? (
              <div className="rounded-xl overflow-hidden shadow-lg">
                <video width="100%" controls className="aspect-video">
                  <source src={movieDetails?.trailer} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <p className="text-gray-500 italic">No trailer available</p>
            )}
          </div>

          {/* Website Link */}
          {movieDetails?.website && (
            <a
              href={movieDetails?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200
                rounded-lg text-gray-700 transition-colors duration-200"
            >
              <LinkIcon size={16} />
              Visit Official Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
