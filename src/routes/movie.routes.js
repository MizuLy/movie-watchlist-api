const express = require("express");
const {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");
const verifyToken = require("../middleware/verifyToken");
const {
  addMovieSchema,
  updateMovieSchema,
} = require("../validators/movieValidator");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.post("/", validateRequest(addMovieSchema), verifyToken, addMovie);
router.get("/", getMovies);
router.put(
  "/:id",
  validateRequest(updateMovieSchema),
  verifyToken,
  updateMovie,
);
router.delete("/:id", verifyToken, deleteMovie);

module.exports = router;
