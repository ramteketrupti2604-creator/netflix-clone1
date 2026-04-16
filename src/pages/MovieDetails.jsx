import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const API_KEY = import.meta.env.VITE_API_KEY;

  const [data, setData] = useState(null);
  const [videoId, setVideoId] = useState("");

  // 🔥 Detect type (movie / tv)
  const type = location.pathname.split("/")[1];

  // 🎬 Fetch details
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id, type]);

  // ▶️ Watch Now (NO REDIRECT)
  const handleWatch = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`
      );

      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setVideoId(trailer.key);
      } else {
        alert("Trailer not available");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen pt-20 px-4 md:px-6">

      {/* 🔥 Main Layout */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">

        {/* 🎬 Poster */}
        {data.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title || data.name}
            className="w-40 sm:w-52 md:w-60 rounded"
          />
        )}

        {/* 📄 Details */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {data.title || data.name}
          </h1>

          <p className="mt-3 text-gray-300 max-w-xl text-sm sm:text-base">
            {data.overview}
          </p>

          <p className="mt-2 text-yellow-400">
            ⭐ {data.vote_average}
          </p>

          {/* 🎬 Watch Button */}
          <button
            onClick={handleWatch}
            className="mt-5 bg-red-600 px-6 py-2 rounded hover:bg-red-700 transition"
          >
            ▶ Watch Now
          </button>
        </div>
      </div>

      {/* 🎥 Trailer Modal */}
      {videoId && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">

          <div className="relative w-[95%] md:w-[70%]">

            {/* ❌ Close */}
            <button
              onClick={() => setVideoId("")}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ✖
            </button>

            {/* 🎬 Player */}
            <YouTube
              videoId={videoId}
              opts={{
                width: "100%",
                height: window.innerWidth < 768 ? "250" : "400",
                playerVars: { autoplay: 1 },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;