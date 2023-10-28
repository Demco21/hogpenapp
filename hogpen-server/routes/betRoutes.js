const express = require("express");
const {
  placeBet,
  fetchAllBets,
  fetchBetsById
} = require("../controllers/betControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, placeBet);
router.get('/fetchBets', protect, fetchAllBets);
router.get('/fetchBetsById/:userId', protect, fetchBetsById);

module.exports = router;