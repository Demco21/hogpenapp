import './myStyles.css';
import React, { useContext, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { myContext } from "./MainContainer";
import logo from "../Images/hoghunter.png"
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";

function Bets() {
    return (
      <div className="list-container">
        <div className="ug-header">
            <img src={logo} style={{height:"2rem", width:"2rem"}} alt="logo"/>
        <p className="ug-title">Betting Dashboard</p>
        </div>
        <div className="messages-container">
        </div>
      </div>
    );
}

export default Bets;




