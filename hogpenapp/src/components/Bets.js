import './myStyles.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useLocation } from "react-router-dom";

function Bets() {
  const [searchParams] = useSearchParams({});
  const userData = JSON.parse(localStorage.getItem("userData"));
  //const [refresh, setRefresh] = useState(true);
  const { search } = useLocation();
  const [bets, setBets] = useState([]);
  const [dashboardTitle, setDashboardTitle] = useState();
  var dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  var timeOptions = { hour12: true, hour: 'numeric', minute:'2-digit' };

  useEffect(() => {
    setBets(null);
    if(searchParams.get("user")){
      setDashboardTitle(searchParams.get("name")+" Betting History");
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`
        }
      };
      axios.get("http://localhost:8080/bets/fetchBetsById/"+searchParams.get("user"), config).then((data) => {
        setBets(data.data);
      });
    }else{
      setDashboardTitle("Betting Dashboard");
      const config = {
        headers: {
            Authorization: `Bearer ${userData.data.token}`
        }
      };
      axios.get("http://localhost:8080/bets/fetchBets", config).then((data) => {
        setBets(data.data);
      });
    }
  }, [search, searchParams, userData.data.token]);

  return (
      <div className="list-container">
        <div className="ug-header">
          <p className="ug-title">{dashboardTitle}</p>
        </div>
        <div className="messages-container">

          {bets != null && bets.length > 0 && bets.map((bet, i)=>{
            var date = new Date(bet.createdAt).toLocaleString("en-US", dateOptions);
            var time = new Date(bet.createdAt).toLocaleString("en-US", timeOptions);
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
                    <p className="self-timestamp">{date} {time}</p>
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
                      <p className="self-timestamp">{date} {time}</p>
                  </div>
                </div>
              )
            }
          })}

          {bets != null && bets.length === 0 && 
            <div className="no-bets">
              No bets to display
            </div>}
        </div>
      </div>
  );
}

export default Bets;




