import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(fetchUrl).then((res) => setMovies(res.data.results));
  }, [fetchUrl]);

  return (
    <div className="ml-6 mt-8">
      <h2 className="text-xl mb-3">{title}</h2>

      <div className="flex gap-4 overflow-x-scroll">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onMouseEnter={() => setHovered(movie.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              className="w-36 rounded cursor-pointer hover:scale-110 transition"
            />

            {/* 🔥 Hover Card */}
            {hovered === movie.id && (
              <div className="absolute top-0 left-0 w-60 bg-black p-3 rounded shadow-xl z-20">
                <h3 className="text-sm font-bold">{movie.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-3">
                  {movie.overview}
                </p>

                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="mt-2 bg-red-600 px-3 py-1 text-xs rounded"
                >
                  ▶ Play
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;