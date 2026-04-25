const { prisma } = require("../config/db");

const addMovie = async (req, res) => {
  try {
    const { title, overview, releaseYear, genres, runTime, posterUrl } =
      req.body;

    const movie = await prisma.movie.create({
      data: {
        title,
        overview,
        releaseYear,
        genres,
        runTime,
        posterUrl,
        createdBy: req.user.id,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        id: movie.id,
        title: title,
        overview: overview,
        releaseYear: releaseYear,
        genres: genres,
        runTime: runTime,
        posterUrl: posterUrl,
        createdBy: req.user.id,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();

    res.status(200).json({ status: "success", movies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { title, overview, releaseYear, genres, runTime, posterUrl } =
      req.body;

    const movie = await prisma.movie.findUnique({
      where: { id: req.params.id },
    });

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    if (movie.createdBy !== req.user.id)
      return res.status(403).json({ error: "Not allowed to edit movie" });

    // Doesn't return null if no change
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (overview !== undefined) updateData.overview = overview;
    if (releaseYear !== undefined) updateData.releaseYear = releaseYear;
    if (genres !== undefined) updateData.genres = genres;
    if (runTime !== undefined) updateData.runTime = runTime;
    if (posterUrl !== undefined) updateData.posterUrl = posterUrl;

    const updatedMovie = await prisma.movie.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.status(200).json({
      status: "success",
      data: {
        movie: updatedMovie,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: req.params.id },
    });

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    if (movie.createdBy !== req.user.id)
      return res.status(403).json({ error: "Not allowed to delete the movie" });

    await prisma.movie.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ status: "success", message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { addMovie, getMovies, updateMovie, deleteMovie };
