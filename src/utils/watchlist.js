export const getWatchlist = () => {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
};

export const addToWatchlist = (movie) => {
  const list = getWatchlist();

  if (!list.find((item) => item.id === movie.id)) {
    localStorage.setItem("watchlist", JSON.stringify([...list, movie]));
  }
};