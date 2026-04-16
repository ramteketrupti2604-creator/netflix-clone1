import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(fetchUrl).then((res) => setMovies(res.data.results));
  }, [fetchUrl]);

  return (
    <div className="ml-4 md:ml-6 mt-6">
      <h2 className="text-lg md:text-xl mb-2">{title}</h2>

      <div className="flex gap-3 overflow-x-scroll">
        {movies.map(
          (item) =>
            item.poster_path && (
              <img
                key={item.id}
                onClick={() =>
                  navigate(`/${item.media_type || "movie"}/${item.id}`)
                }
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                className="w-28 sm:w-32 md:w-40 rounded cursor-pointer hover:scale-110 transition"
              />
            )
        )}
      </div>
    </div>
  );
};

export default Row;