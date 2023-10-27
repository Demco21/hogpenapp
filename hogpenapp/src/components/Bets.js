import './myStyles.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../Images/hoghunter.png"

function Bets() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [refresh, setRefresh] = useState(true);
  const [bets, setBets] = useState([]);

  useEffect(() => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.data.token}`
        }
    };
    axios.get("http://localhost:8080/bets/fetchBets", config).then((data) => {
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
          if(bet.user._id === userData.data._id){
            return(
              <div className="MessageSelf" key={i}>
                <div className="selfMessageBox">
                  <p className="bet-title">{bet.user.name}</p>
                  {bet.bets.map((bet, i)=>{
                    return(
                      <p key={i} className="bet-text">{bet}</p>
                    )
                  })}
                  <p className="bet-title">Bet ${bet.wager} to win ${bet.payout}</p>
                  <p className="self-timestamp">12:00am</p>
                </div>
                <p className="convo-icon-self">{bet.user.name[0]}</p>
              </div>
            )
          }else{
            return(
              <div className="othersMessageBox" key={i}>
                <p className="convo-icon">{bet.user.name[0]}</p>
                <div className="other-text-content">
                    <p className="bet-title">{bet.user.name}</p>
                    {bet.bets.map((bet, i)=>{
                      return(
                        <p key={i} className="bet-text">{bet}</p>
                      )
                    })}
                    <p className="bet-title">Bet ${bet.wager} to win ${bet.payout}</p>
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




