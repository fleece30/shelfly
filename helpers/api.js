import axios from "axios";
import { TMDB_API_KEY } from "@env";

const movieService = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 6000,
});

const fetchByGenre = async (genreId, page = 1) =>
  await movieService.get(
    `discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`
  );

const fetchTrending = async () =>
  await movieService.get(
    `trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US`
  );

const fetchMovieById = async (id) =>
  await movieService.get(`movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`);

const fetchTVById = async (id) =>
  await movieService.get(`tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`);

const discoverMovies = async () =>
  await movieService.get(
    `discover/movie?api_key=${TMDB_API_KEY}&language=en-US`
  );

const discoverTV = async () =>
  await movieService.get(
    `discover/tv?api_key=${TMDB_API_KEY}&language=en-US&vote_average.gte=6`
  );

const fetchByName = async (searchTerm) =>
  await movieService.get(
    `search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${searchTerm}`
  );

export {
  fetchTrending,
  fetchMovieById,
  fetchByGenre,
  fetchTVById,
  fetchByName,
  discoverTV,
  discoverMovies,
};
