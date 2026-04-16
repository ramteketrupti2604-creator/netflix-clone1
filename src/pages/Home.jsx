import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
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

  // 🔍 SEARCH (WITH ADULT CONTENT)
  const fetchSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=true`
      );

      const filtered = res.data.results.filter(
        (item) =>
          (item.media_type === "movie" || item.media_type === "tv") &&
          item.poster_path
      );

      setResults(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-16">

      <Banner />

      {/* 🔍 Search */}
      <div className="p-6 flex justify-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies & web series..."
          className="w-full max-w-md px-4 py-2 rounded bg-gray-800 outline-none"
        />
      </div>

      {/* 🎯 SEARCH RESULTS */}
      {query ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-6">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/${item.media_type}/${item.id}`)}
              className="cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                className="rounded hover:scale-105 transition"
              />
              <p className="text-sm mt-1">
                {item.title || item.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* 📺 Categories WITH adult content */}

          <Row
            title="Trending"
            fetchUrl={`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&include_adult=true`}
          />

          <Row
            title="Top Rated"
            fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&include_adult=true`}
          />

          <Row
            title="Action Movies"
            fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&include_adult=true`}
          />

          <Row
            title="Comedy Movies"
            fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&include_adult=true`}
          />
        </>
      )}
    </div>
  );
};

export default Home;