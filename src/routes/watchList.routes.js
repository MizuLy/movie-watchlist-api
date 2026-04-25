const express = require("express");
const {
  addToWatchList,
  deleteFromWatchList,
  updateWatchList,
  getWatchList,
} = require("../controllers/watchList.controller");
const verifyToken = require("../middleware/verifyToken");
const validateRequest = require("../middleware/validateRequest");
const {
  addToWatchListSchema,
  updateWatchListSchema,
} = require("../validators/watchListValidator");

const router = express.Router();

router.use(verifyToken);

router.post("/", validateRequest(addToWatchListSchema), addToWatchList);
router.get("/", getWatchList);
router.put("/:id", validateRequest(updateWatchListSchema), updateWatchList);
router.delete("/:id", deleteFromWatchList);

module.exports = router;
