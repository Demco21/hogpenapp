import './myStyles.css';
import logo from "../Images/hoghunter.png"
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";

function Welcome() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.data.token : null;

    useEffect(()=>{
        if(token === null){
            navigate("/");
            return;
        }
    });

    return (
        <div className="welcome-container">
            <img src={logo} alt="Logo" className="welcome-logo"/>
            <p>Welcome to the hogpen!</p>
        </div>
    );
}

export default Welcome;