const getReleaseDate = (item, type) => {
  if (!item.release_date && !item.first_air_date) return null;
  return type === 0
    ? item.release_date.split("-")[0]
    : item.first_air_date.split("-")[0];
};

export { getReleaseDate };
