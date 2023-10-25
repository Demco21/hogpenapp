import './myStyles.css';
import React from "react";
import logo from "../Images/hoghunter.png"
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log("userData::",userData);
    const nav = useNavigate();
    if(!userData){
        console.log("User not authenticated");
        nav("/");
    }
    return (
        <div className="welcome-container">
            <img src={logo} alt="Logo" className="welcome-logo"/>
            <p>Welcome to the hogpen!</p>
        </div>
    );
}

export default Welcome;