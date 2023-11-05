const mongoose = require("mongoose");

const betModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: false
    },
    bets: [{
        type: String,
        required: true,
        trim: true,
    }],
    wager: {
        type: Number,
        required: true
    },
    payout: {
        type: Number,
        required: true
    },
    isWin: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        required: true
    }
},{
    timeStamp: true,
});

const Bet = mongoose.model("Bet", betModel);

module.exports = Bet;