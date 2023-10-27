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
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [refresh, setRefresh] = useState(true);
  const [bets, setBets] = useState([]);

  useEffect(() => {
    console.log("User***:",userData.data._id);
    const config = {
        headers: {
            Authorization: `Bearer ${userData.data.token}`
        }
    };
    axios.get("http://localhost:8080/bets/fetchBets", config).then((data) => {
        console.log("Bets***:",data.data[0].user);
        setBets(data.data);
    });
  }, [refresh]);

  return (
    <div className="list-container">
      <div className="ug-header">
          <img src={logo} style={{height:"2rem", width:"2rem"}} alt="logo"/>
      <p className="ug-title">Betting Dashboard</p>
      </div>
      <div className="messages-container">
        {bets.map((bet, i)=>{
          if(bet.user === userData.data._id){
            return(
              <div className="MessageSelf" key={i}>
                <p className="convo-icon">C</p>
                <div className="selfMessageBox">
                  <p className="convo-title">{bet.title}</p>
                  <p className="convo-lastMessage">{bet.bets[0]}</p>
                  <p className="self-timestamp">12:00am</p>
                </div>
              </div>
            )
          }else{
            return(
              <div className="othersMessageBox" key={i}>
                <p className="convo-icon">C</p>
                <div className="other-text-content">
                    <p className="convo-title">{bet.title}</p>
                    <p className="convo-lastMessage">{bet.bets[0]}</p>
                    <p className="self-timestamp">12:00am</p>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
}

export default Bets;




