const mongoose = require("mongoose");

const betModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: false
    },
    bets: [{
        type: String,
        required: true,
        trim: true,
    }]
},{
    timeStamp: true,
});

const Bet = mongoose.model("Bet", betModel);

module.exports = Bet;