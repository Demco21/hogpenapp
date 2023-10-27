import './myStyles.css';
import React, { useState } from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { IconButton } from '@mui/material';
import logo from "../Images/hoghunter.png"
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";

function CreateGroups() {
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
        console.log(betSlip[0]);
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
        console.log("id:",e.target.id);
        console.log("value:",e.target.value);
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
    const placeBet = () => {
        console.log("placeBet Fired");
        const config = {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        };
        const myBets = [];
        myBets[0] = betSlip[0].subjectName + betSlip[0].selectedBetOption1;
        axios.post("http://localhost:8080/bets",
            {
              title: "Test",
              bets: myBets
            },
            config
          )
          .then(({ data }) => {
            console.log("Message Fired");
          });
      };
    return (
        <div className="list-container">
            <div className="ug-header">
                <img src={logo} style={{height:"2rem", width:"2rem"}} alt="logo"/>
                <p className="ug-title">Create a Bet</p>
            </div>
            <div className="messages-container">

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