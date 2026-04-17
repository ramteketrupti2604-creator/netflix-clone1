import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Row from "../components/Row";

const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSearch();
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false`
      );

      const filtered =
        res.data?.results?.filter(
          (item) =>
            (item.media_type === "movie" || item.media_type === "tv") &&
            item.poster_path
        ) || [];

      setResults(filtered);
    } catch (err) {
      console.log("Search error:", err);
      setResults([]);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">

      {/* 🔍 SEARCH BAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black px-4 py-3 shadow-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies & web series..."
          className="w-full max-w-2xl mx-auto block px-4 py-2 rounded bg-gray-800 text-white outline-none"
        />
      </div>

      {/* spacing for fixed search bar */}
      <div className="pt-20"></div>

      {/* 🎯 CONTENT */}
      {query ? (
        results.length > 0 ? (
          <div className="px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                className="cursor-pointer active:scale-95 transition"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  className="rounded w-full object-cover"
                  alt={item.title || item.name}
                />

                <p className="text-xs sm:text-sm mt-1 line-clamp-1">
                  {item.title || item.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-32 text-gray-400">
            No results found
          </p>
        )
      ) : (
        <div className="px-2 sm:px-4 space-y-6">

          <Row
            title="Trending"
            fetchUrl={`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`}
          />

          <Row
            title="Top Rated"
            fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
          />

        </div>
      )}
    </div>
  );
};

export default Home;