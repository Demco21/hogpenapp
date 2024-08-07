const expressAsyncHandler = require("express-async-handler");
const Bet = require("../models/betModel");

const placeBet = expressAsyncHandler(async (req, res) => {
    console.log("bet received by server!")
    const { title, bets, wager, payout, isWin } = req.body;
  
    if (!bets) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newBet = {
      user: req.user._id,
      title: title,
      bets: bets,
      wager: wager,
      payout: payout,
      isWin: isWin,
      createdAt: Date.now()
    };
  
    try {
      var mybet = await Bet.create(newBet);
      res.json(mybet);
    } catch (error) {
      res.status(400);
      throw new Error(error.mybet);
    }
  });

  const fetchAllBets = expressAsyncHandler (async (req, res) => {
    const bets = await Bet.find({}).sort({createdAt : -1})
    .populate("user", "-password");
    res.send(bets);
  });

  const fetchBetsById = expressAsyncHandler (async (req, res) => {
    const bets = await Bet.find({ user: req.params.userId }).sort({createdAt : -1})
    .populate("user", "-password");
    res.send(bets);
  });
  
  module.exports = { placeBet, fetchAllBets, fetchBetsById };