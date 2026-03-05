import express from "express";
import {
  GetAllMovies,
  GetCinemaMovies,
  GetMoviesByCountry,
  GetMoviesByGenre,
  GetSeriesMovies,
  GetSingleMovies,
  GetTvShowMovies,
  PostMovie,
} from "../Controllers/MovieControll.js";
import { Login, Register } from "../Controllers/UserControll.js";

const router = express.Router();

router.get("/movie", GetAllMovies);
router.get("/movie/genre/:genre", GetMoviesByGenre);
router.get("/movie/country/:country", GetMoviesByCountry);
router.get("/movie/single", GetSingleMovies);
router.get("/movie/series", GetSeriesMovies);
router.get("/movie/tvshow", GetTvShowMovies);
router.get("/movie/movie", GetCinemaMovies);
router.post("/movie", PostMovie);
router.post("/auth/register", Register);
router.post("/auth/login", Login);

export default router;
