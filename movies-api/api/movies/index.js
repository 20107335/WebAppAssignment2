import express from "express";
import asyncHandler from "express-async-handler";
import {
  getMovies,
  getUpcomingMovies,
  getMovieGenres,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getTrendingMovies,
  getMovieDetails,
  getMovieImages,
  getMovieCredits,
  getMovieReviews,
  getMovieRecommendations,
  getActorDetails,
  getActorMovieCredits,
} from "../tmdb-api";

const router = express.Router();

// Discover movies
router.get(
  "/discover",
  asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const movies = await getMovies(page);
    res.status(200).json(movies);
  })
);

// Upcoming movies
router.get(
  "/upcoming",
  asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const movies = await getUpcomingMovies(page);
    res.status(200).json(movies);
  })
);

// Movie genres
router.get(
  "/genres",
  asyncHandler(async (req, res) => {
    const genres = await getMovieGenres();
    res.status(200).json(genres);
  })
);

router.get("/popular", asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const movies = await getPopularMovies(page);
  res.status(200).json(movies);
}));

router.get("/top-rated", asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const movies = await getTopRatedMovies(page);
  res.status(200).json(movies);
}));

router.get("/now-playing", asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const movies = await getNowPlayingMovies(page);
  res.status(200).json(movies);
}));

router.get("/trending", asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const movies = await getTrendingMovies(page);
  res.status(200).json(movies);
}));

router.get("/:id", asyncHandler(async (req, res) => {
  const movie = await getMovieDetails(req.params.id);
  res.status(200).json(movie);
}));

router.get("/:id/images", asyncHandler(async (req, res) => {
  const images = await getMovieImages(req.params.id);
  res.status(200).json(images);
}));

router.get("/:id/credits", asyncHandler(async (req, res) => {
  const credits = await getMovieCredits(req.params.id);
  res.status(200).json(credits);
}));

router.get("/:id/reviews", asyncHandler(async (req, res) => {
  const reviews = await getMovieReviews(req.params.id);
  res.status(200).json(reviews);
}));

router.get("/:id/recommendations", asyncHandler(async (req, res) => {
  const recs = await getMovieRecommendations(req.params.id);
  res.status(200).json(recs);
}));

router.get("/actor/:id", asyncHandler(async (req, res) => {
  const actor = await getActorDetails(req.params.id);
  res.status(200).json(actor);
}));

router.get("/actor/:id/credits", asyncHandler(async (req, res) => {
  const credits = await getActorMovieCredits(req.params.id);
  res.status(200).json(credits);
}));





export default router;
