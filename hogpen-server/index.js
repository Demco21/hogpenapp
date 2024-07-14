const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const path = require('path');

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../hogpenapp/build");

dotenv.config();
app.use(express.json());

app.use(cors({
	origin: '*'
}));
console.log("Server is using CORS origin: *");

app.options('*', cors());
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const userRoutes = require("./routes/userRoutes");
const betRoutes = require("./routes/betRoutes");
app.use("/user", userRoutes);
app.use("/bets", betRoutes);

app.use(express.static(buildPath));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "../hogpenapp/build/index.html"));
});

const connectDb = async() => {
    try{
        const connect = await mongoose.connect(MONGO_URI);
        console.log("Server is connected to Database");
    }catch(err){
        console.log("Server failed to connect to Database : ", err.message);
    }
}
connectDb();

app.listen(PORT, console.log("Server is running on port ", PORT));
