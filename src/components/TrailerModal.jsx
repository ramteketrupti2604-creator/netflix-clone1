import YouTube from "react-youtube";

const TrailerModal = ({ videoId, onClose }) => {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="relative w-[90%] md:w-[60%]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl"
        >
          ✖
        </button>

        <YouTube videoId={videoId} className="w-full" />
      </div>
    </div>
  );
};

export default TrailerModal;