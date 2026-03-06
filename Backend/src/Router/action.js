import express from "express";
import {
  DeleteMovie,
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
import { uploadMovieImages } from "../Middleware/upload.js";

const router = express.Router();

router.get("/movie", GetAllMovies);
router.get("/movie/genre/:genre", GetMoviesByGenre);
router.get("/movie/country/:country", GetMoviesByCountry);
router.get("/movie/single", GetSingleMovies);
router.get("/movie/series", GetSeriesMovies);
router.get("/movie/tvshow", GetTvShowMovies);
router.get("/movie/movie", GetCinemaMovies);
router.delete("/movie/:id", DeleteMovie);
router.post(
  "/movie",
  uploadMovieImages.fields([
    { name: "poster", maxCount: 1 },
    { name: "backdoor", maxCount: 1 },
  ]),
  PostMovie,
);
router.post("/auth/register", Register);
router.post("/auth/login", Login);

export default router;
