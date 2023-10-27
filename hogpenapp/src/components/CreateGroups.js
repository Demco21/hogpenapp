import './myStyles.css';
import React, { useState } from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { IconButton } from '@mui/material';
import logo from "../Images/hoghunter.png"
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateGroups() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [betSlip, setBetSlip] = useState([{
        subject: "",
        subjectName:"",
        selectedBetOption1: "",
        selectedBetOption2: "",
        selectedSpreadSign: "",
        selectedSpreadValue: "",
        betSlipValidated: true
    }]);
    const [wager, setWager] = useState(0);
    const [payout, setPayout] = useState(0);
    const subjectOptions = ["", "Team", "Player"];
    const teamBetOptions = ["", "Moneyline", "Spread"];
    const playerBetOptions = [
        "",
        "TD Scorer",
        "Rec TD Scorer",
        "Pass TD Scorer",
        "Rec Yards",
        "Pass Yards",
        "Rush Yards",
        "Receptions"
    ];
    const tdScorerOpts1 = ["","First","Anytime","1","2","3","4","5"];
    const tdScorerOpts2 = ["","Anytime","1","2","3","4","5"];
    const receptionOpts = ["","First","1","2","3","4","5","6","7","8","9","10","11","12","13","14", "15","16","17","18","19","20"];
    const yardOpts = ["","1","2","3","4","5","6","7","8","9","10","11","12","13","14", "15","16","17","18","19","20"];
    const spreadSignOpts = ["","+","-"];
    const spreadOpts = ["","1","2","3","4","5","6","7","8","9","10","11","12","13","14", "15","16","17","18","19","20"];

    const handleAdd=()=>{
        if(betSlip.every(bet => bet.betSlipValidated)){
            const newBetSlip = [...betSlip,
            {
                subject: "",
                subjectName:"",
                selectedBetOption1: "",
                selectedBetOption2: "",
                selectedSpreadSign: "",
                selectedSpreadValue: "",
                betSlipValidated: true
            }
            ];
            setBetSlip(newBetSlip);
        }
    };

    const updateBetSlip=(index, e)=>{
        const updatedBetSlip = [...betSlip];
        if(e.target.id==="subject"){
            updatedBetSlip[index] = {...updatedBetSlip[index], 
                selectedBetOption1: "",
                selectedBetOption2: "",
                selectedSpreadSign: "",
                selectedSpreadValue: "",
                betSlipValidated: true
                }
        }
        if(e.target.id==="selectedBetOption1"){
            updatedBetSlip[index] = {...updatedBetSlip[index], 
                selectedBetOption2: "",
                selectedSpreadSign: "",
                selectedSpreadValue: "",
                betSlipValidated: true
                }
        }
        updatedBetSlip[index][e.target.id] = e.target.value;
        setBetSlip(updatedBetSlip);
    };

    const placeBet = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        };
        const myBets = [];
        {betSlip.map((bet, i)=>{
            var betStr = bet.subjectName + " " + bet.selectedBetOption1;
            if(bet.selectedBetOption2)
                betStr = betStr + " " + bet.selectedBetOption2;
            if(bet.selectedSpreadSign)
                betStr = betStr + " " + bet.selectedSpreadSign;
            if(bet.selectedSpreadValue)
                betStr = betStr + " " + bet.selectedSpreadValue;
            myBets[i] = betStr;
        })};
        await axios.post("http://localhost:8080/bets",
            {
              title: "",
              bets: myBets,
              wager: wager,
              payout: payout,
              isWin: false
            },
            config
          )
          .then(({ data }) => {
            console.log("Message Fired");
          });
        navigate('/app/bets');
    };

    return (
        <div className="list-container">
            <div className="ug-header">
                <img src={logo} style={{height:"2rem", width:"2rem"}} alt="logo"/>
                <p className="ug-title">Create a Bet</p>
            </div>
            <div className="messages-container">
                <div className="bet-title">
                Wager:
                    <input className="search-box"
                        id="wager"
                        placeholder={"$0.00"}
                        onChange={(e)=>setWager(e.target.value)}
                    />
                Payout:
                    <input className="search-box"
                        id="payout"
                        placeholder={"$0.00"}
                        onChange={(e)=>setPayout(e.target.value)}
                    />
                </div>

                {betSlip.map((bet, i)=>{
                    return(
                        <div key={i}>
                            <select id="subject" name="subject" className="custom-select"
                                value={bet.subject} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {subjectOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {(bet.subject === "Team" || bet.subject === "Player") && 
                            <input className="search-box"
                                id="subjectName"
                                placeholder={bet.subject+" Name"}
                                onChange={(e)=>updateBetSlip(i, e)}
                            />}

                            {bet.subject === "Team"
                            && <select id="selectedBetOption1" name="selectedBetOption1" className="custom-select"
                                value={bet.selectedBetOption1} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {teamBetOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Team" && bet.selectedBetOption1 === "Spread") 
                            && <select id="selectedSpreadSign" name="selectedSpreadSign" className="custom-select"
                                value={bet.selectedSpreadSign} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {spreadSignOpts.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Team" && bet.selectedBetOption1 === "Spread") 
                            && <select id="selectedSpreadValue" name="selectedSpreadValue" className="custom-select"
                                value={bet.selectedSpreadValue} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {spreadOpts.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {bet.subject === "Player"
                            && <select id="selectedBetOption1" name="selectedBetOption1" className="custom-select"
                                value={bet.selectedBetOption1} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {playerBetOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Player" && bet.selectedBetOption1 === "TD Scorer") 
                            && <select id="selectedBetOption2" name="selectedBetOption2" className="custom-select"
                                value={bet.selectedBetOption2} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {tdScorerOpts1.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Player" 
                            && (bet.selectedBetOption1 === "Rec TD Scorer" 
                            || bet.selectedBetOption1 === "Pass TD Scorer")) 
                            && <select id="selectedBetOption2" name="selectedBetOption2" className="custom-select"
                                value={bet.selectedBetOption2} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {tdScorerOpts2.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Player" 
                            && (bet.selectedBetOption1 === "Rec Yards" 
                            || bet.selectedBetOption1 === "Pass Yards" 
                            || bet.selectedBetOption1 === "Rush Yards")) 
                            && <select id="selectedBetOption2" name="selectedBetOption2" className="custom-select"
                                value={bet.selectedBetOption2} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {yardOpts.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Player" 
                            && (bet.selectedBetOption1 === "Receptions")) 
                            && <select id="selectedBetOption2" name="selectedBetOption2" className="custom-select"
                                value={bet.selectedBetOption2} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {receptionOpts.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {bet.subject === "Player" && bet.subjectName 
                            && bet.selectedBetOption1 && bet.selectedBetOption2 
                            &&
                            // <IconButton
                            //     onClick={() => {
                            //         enterSubjectName();
                            //     }}
                            // >
                                <DoneOutlineRoundedIcon/>
                            //</IconButton>
                            }

                            {bet.subject === "Team" && bet.subjectName
                            && (bet.selectedBetOption1 === "Moneyline"|| (bet.selectedBetOption1 === "Spread" 
                            && bet.selectedSpreadSign && bet.selectedSpreadValue))
                            &&
                            // <IconButton
                            //     onClick={() => {
                            //         enterSubjectName();
                            //     }}
                            // >
                                <DoneOutlineRoundedIcon/>
                            //</div></IconButton>
                            }
                        </div>
                    )
                })}

                <div>
                <IconButton
                    onClick={()=>handleAdd()}
                >
                    <AddCircleIcon/>
                </IconButton>
                </div>
            </div>
            <div className="finalize-box">
                <Button className="finalize-button" variant="contained"
                    onClick={()=>placeBet()}
                >
                    It's a lock
                </Button>
            </div>
        </div>
    );
} 

export default CreateGroups;