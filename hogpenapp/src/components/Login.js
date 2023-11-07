import './myStyles.css';
import React, {useState} from "react";
import logo from "../Images/hoghunter.png"
import { Button, TextField, Backdrop, CircularProgress } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Toaster from "./Toaster"

function Login() {
    const [showlogin, setShowLogin] = useState(true);
    const [data, setData] = useState({name: "", email: "", password: ""});
    const [loading, setLoading] = useState(false);

    const [logInStatus, setLogInStatus] = React.useState("");
    const [signInStatus, setSignInStatus] = React.useState("");

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const loginHandler = async (e) => {
        setLoading(true);
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const response = await axios.post(
                "https://hogpenbets.com/user/login/",
                data,
                config
            );
            setLogInStatus({msg: "Success", key: Math.random()});
            localStorage.setItem("userData", JSON.stringify(response));
            navigate("/app/welcome");
            setLoading(false);
        }catch(error){
            console.log(error);
            setLogInStatus({
                msg: "Invalid Username or Password",
                key: Math.random()
            });
            setLoading(false);
        }
    };

    const signUpHandler = async () => {
        setLoading(true);
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const response = await axios.post(
                "https://hogpenbets.com/user/register/",
                data,
                config
            );
            setSignInStatus({msg: "Success", key: Math.random()});
            setLoading(false);
            localStorage.setItem("userData", JSON.stringify(response));
            navigate("/app/welcome");
        }catch(error){
            console.log("error::",error);
            if(error.code === "ERR_NETWORK"){
                setSignInStatus({
                    msg: "Network error",
                    key: Math.random()
                });
            }
            else if(error.response.status === 400){
                setSignInStatus({
                    msg: "User with this email ID already exists",
                    key: Math.random()
                });
            }
            else if(error.response.status === 405){
                setSignInStatus({
                    msg: "User with this email ID already exists",
                    key: Math.random()
                });
            }
            else if(error.response.status === 406){
                setSignInStatus({
                    msg: "Username already taken, please try another one",
                    key: Math.random()
                });
            }
            setLoading(false);
        }
    };

    return (
        <>
        <Backdrop
            sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={loading}    
        >
            <CircularProgress color="secondary" />
        </Backdrop>
        <div className="login-container">
            <div className="image-container">
                <img src = {logo} alt="Logo" className="welcome-logo"/>
            </div>

            {showlogin && (
                <div className="login-box">
                    <p className="login-text">Login to your Account</p>
                    <TextField 
                        onChange={changeHandler}
                        id="standard-basic" 
                        label="Enter User Name" 
                        variant="outlined" 
                        color="secondary"
                        name="name"
                    />
                    <TextField 
                        onChange={changeHandler}
                        id="outlined-password-input" 
                        label="Enter Password" 
                        type="password"
                        autoComplete="current-password"
                        color="secondary"
                        name="password"
                    />
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={loginHandler}
                    >
                        Login
                    </Button>
                    <p>
                        Don't have an Account ?{" "}
                        <span
                            className="hyper"
                            onClick={() => {
                                setShowLogin(false);
                            }}
                        >
                            Sign Up
                        </span>
                    </p>
                    {logInStatus ? (
                        <Toaster key={logInStatus.key} message={logInStatus.msg} />
                    ) : null}
                </div>
            )}
            {!showlogin && (
                <div className="login-box">
                <p className="login-text">Create your account</p>
                <TextField 
                    onChange={changeHandler}
                    id="standard-basic" 
                    label="Enter User Name" 
                    variant="outlined" 
                    color="secondary"
                    name="name"
                    helperText=""
                />
                <TextField 
                    onChange={changeHandler}
                    id="standard-basic" 
                    label="Enter Email Address" 
                    variant="outlined" 
                    color="secondary"
                    name="email"
                />
                <TextField 
                    onChange={changeHandler}
                    id="outlined-password-input" 
                    label="Password" 
                    type="password"
                    autoComplete="current-password"
                    color="secondary"
                    name="password"
                />
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={signUpHandler}
                >
                    Sign Up
                </Button>
                <p>
                    Already have an account? 
                    <span
                        className="hyper"
                        onClick={() => {
                            setShowLogin(true);
                        }}
                    >
                        Log in
                    </span>
                </p>
                {signInStatus ? (
                    <Toaster key={signInStatus.key} message={signInStatus.msg} />
                ) : null}
            </div>
            )}
        </div>
        </>
    );
}

export default Login;
