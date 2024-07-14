const UserModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

const loginController = expressAsyncHandler (async (req, res) => {
    const {name, password} = req.body;

    //check for required fields
    if(!name || !password){
        res.send(400);
        throw Error("Missing required fields");
    }

    const user = await UserModel.findOne({name});

    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Invalid username or password");
    }

});

const registerController = expressAsyncHandler (async (req, res) => {
    const {name, email, password} = req.body;

    //check for required fields
    if(!name || !email || !password){
        res.send(400);
        res.send("Missing required fields");
        throw Error("Missing required fields");
    }

    //already existing email
    const emailExists = await UserModel.findOne({email});
    if(emailExists){
        res.status(401);
        throw new Error("Email already exists");
    }

    //already existing username
    const userNameExists = await UserModel.findOne({name});
    if(userNameExists){
        res.status(400);
        throw new Error("Username already exists");
    }

    //create new user
    const user = await UserModel.create({name, email, password});
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Registration Error");
    }
});

const fetchAllUsersController = expressAsyncHandler (async (req, res) => {
    const keywork = req.query.search
        ? {
            $or: [
                {name: {$regex: req.query.search, $options: "i"}},
                {email: {$regex: req.query.search, $options: "i"}}
            ]
        }
        : {};

        const users = await UserModel.find(keywork).find({
            _id: {$ne: req.user._id}
        });
        res.send(users);
});

module.exports = {
    loginController, 
    registerController,
    fetchAllUsersController
};