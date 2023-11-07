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

const corsOptions = {
    origin:"https://hogpenbets.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};
app.use(cors(corsOptions));
console.log("Server is using CORS origin: https://hogpenbets.com");

// Set middleware of CORS 
app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://hogpenbets.com"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });

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
