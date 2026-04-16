import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="hover:scale-105 transition cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
          className="rounded"
        />
        <h2 className="text-sm mt-2">{movie.title}</h2>
      </div>
    </Link>
  );
};

export default MovieCard;