const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const path = require('path');

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../hogpenapp/build");

app.use(express.static(buildPath));

dotenv.config();
app.use(express.json());

app.use(cors({
    origin: '*'
}));
console.log("Server is using CORS");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const userRoutes = require("./routes/userRoutes");
const betRoutes = require("./routes/betRoutes");
app.use("/user", userRoutes);
app.use("/bets", betRoutes);

const connectDb = async() => {
    try{
        const connect = await mongoose.connect(MONGO_URI);
        console.log("Server is connected to Database");
    }catch(err){
        console.log("Server failed to connect to Database : ", err.message);
    }
}
connectDb();

app.get("/*", (req, res)=>{
    res.sendFile(
        path.join(_dirname, "../hogpenapp/build/index.html"),
        function(err){
            if(err){
                res.status(500).send(err);
            }
        }
    )
    res.send("API is running");
});


app.listen(PORT, console.log("Server is running on port ", PORT));
