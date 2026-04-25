const { prisma } = require("../config/db");

const addToWatchList = async (req, res) => {
  try {
    const { movieId, status, rating, notes } = req.body;

    // Verify movie exist
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    // Check if already added
    const inWatchList = await prisma.watchListItem.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId: movieId,
        },
      },
    });

    if (inWatchList)
      return res.status(400).json({ error: "Movie already in the watchlist" });

    const watchListItem = await prisma.watchListItem.create({
      data: {
        userId: req.user.id,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
      },
    });

    res.status(201).json({
      status: "Success",
      message: "Added movie to watchlist",
      data: watchListItem,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getWatchList = async (req, res) => {
  try {
    const watchListItem = await prisma.watchListItem.findMany({
      where: { userId: req.user.id },
    });

    res.status(200).json({ status: "success", watchListItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateWatchList = async (req, res) => {
  try {
    const { status, rating, notes } = req.body;

    const watchListItem = await prisma.watchListItem.findUnique({
      where: { id: req.params.id },
    });

    if (!watchListItem)
      return res.status(404).json({ error: "Movie not found in watchlist" });

    if (watchListItem.userId !== req.user.id)
      return res
        .status(403)
        .json({ error: "Not allowed to update this watchlist item" });

    // Build update data
    const updateData = {};
    if (status !== undefined) updateData.status = status.toUpperCase();
    if (rating !== undefined) updateData.rating = rating;
    if (notes !== undefined) updateData.notes = notes;

    const updatedItem = await prisma.watchListItem.update({
      where: { id: req.params.id }, // Watchlist item ID
      data: updateData,
    });

    res
      .status(200)
      .json({ status: "Success", data: { watchListItem: updatedItem } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFromWatchList = async (req, res) => {
  try {
    const watchListItem = await prisma.watchListItem.findUnique({
      where: { id: req.params.id },
    });

    if (!watchListItem)
      return res.status(404).json({ error: "Movie not found in watchlist" });

    // Ensure only owner can delete
    if (watchListItem.userId !== req.user.id)
      return res
        .status(403)
        .json({ error: "Not allowed to update this watchlist item" });

    await prisma.watchListItem.delete({
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ status: "Success", message: "Removed movie from watchlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addToWatchList,
  deleteFromWatchList,
  updateWatchList,
  getWatchList,
};
