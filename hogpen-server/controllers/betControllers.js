const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Bet = require("../models/betModel");

const placeBet = expressAsyncHandler(async (req, res) => {
    console.log("bet received by server!")
    console.log(req.body);
    console.log(req.user._id);
    const { title, bets } = req.body;
  
    if (!bets) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newBet = {
      user: req.user._id,
      title: title,
      bets: bets,
    };

    console.log(newBet);
  
    try {
      var mybet = await Bet.create(newBet);
  
      console.log(mybet);
    //   mybet = await mybet.populate("sender", "name pic");
    //   mybet = await mybet.populate("chat");
    //   mybet = await mybet.populate("reciever");
    //   mybet = await User.populate(mybet, {
    //     path: "chat.users",
    //     select: "name email",
    //   });
  
      res.json(mybet);
    } catch (error) {
      res.status(400);
      throw new Error(error.mybet);
    }
  });

  const fetchAllBets = expressAsyncHandler (async (req, res) => {
    const keywork = req.query.search
        ? {
            $or: [
                {name: {$regex: req.query.search, $options: "i"}},
                {email: {$regex: req.query.search, $options: "i"}}
            ]
        }
        : {};

        const bets = await Bet.find(keywork).find({
            _id: {$ne: req.user._id}
        });
        res.send(bets);
});
  
  module.exports = { placeBet, fetchAllBets };