import { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [videoId, setVideoId] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => {
        const randomMovie =
          res.data.results[Math.floor(Math.random() * res.data.results.length)];
        setMovie(randomMovie);

        // 🎬 Auto play trailer
        movieTrailer(randomMovie.title || "")
          .then((url) => {
            const params = new URLSearchParams(new URL(url).search);
            setVideoId(params.get("v"));
          })
          .catch(() => {});
      });
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">

      {/* 🎥 Video */}
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: { autoplay: 1, mute: 1, controls: 0 },
          }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text */}
      <div className="absolute bottom-20 left-6 z-10">
        <h1 className="text-5xl font-bold">{movie?.title}</h1>
        <p className="max-w-lg mt-3 text-gray-300">{movie?.overview}</p>
      </div>
    </div>
  );
};

export default Banner;