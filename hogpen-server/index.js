const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
//const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const betRoutes = require("./routes/betRoutes");

const connectDb = async() => {
    try{
        const connect = await mongoose.connect(MONGO_URI);
        console.log("Server is connected to Database");
    }catch(err){
        console.log("Server failed to connect to Database : ", err.message);
    }
}
connectDb();

app.get("/", (req, res)=>{
    res.send("API is running");
});
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/bets", betRoutes);


app.listen(PORT, console.log("Server is running on port ", PORT));
