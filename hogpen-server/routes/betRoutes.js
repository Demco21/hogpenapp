const express = require("express");
const {
  placeBet,
  fetchAllBets
} = require("../controllers/betControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, placeBet);
router.get('/fetchBets', protect, fetchAllBets);

module.exports = router;