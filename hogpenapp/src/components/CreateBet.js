import './myStyles.css';
import React, { useState } from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { IconButton } from '@mui/material';
import logo from "../Images/hoghunter.png"
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateBet() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [betSlip, setBetSlip] = useState([{
        subject: "",
        subjectName:"",
        selectedBetOption1: "",
        selectedBetOption2: "",
        selectedSpreadSign: "",
        selectedSpreadValue: "",
        betSlipValidated: false
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
    const tdScorerOpts1 = ["","First","Anytime",...Array(11).keys()];
    const tdScorerOpts2 = ["","Anytime",...Array(11).keys()];
    const receptionOpts = ["","First",...Array(26).keys()];
    const yardOpts = ["", ...Array(601).keys()];
    const spreadSignOpts = ["","+","-"];
    const spreadOpts = ["", ...Array(101).keys()];

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
                betSlipValidated: false
            }
            ];
            setBetSlip(newBetSlip);
        }
    };

    const handleDelete=(i)=>{
        const newBetSlip = [...betSlip];
        newBetSlip.splice(i, 1);
        setBetSlip(newBetSlip);
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
        updatedBetSlip[index].betSlipValidated = isValidated(updatedBetSlip[index]);
        setBetSlip(updatedBetSlip);
    };

    const isValidated=(bet)=>{
        if(bet.subject==="Team" && bet.subjectName){
            if(bet.selectedBetOption1==="Moneyline"){
                return true;
            }
            if(bet.selectedBetOption1==="Spread" 
            && bet.selectedSpreadSign 
            && bet.selectedSpreadValue){
                return true;
            }
        }
        if(bet.subject==="Player" 
        && bet.subjectName
        && bet.selectedBetOption1
        && bet.selectedBetOption2){
            return true;
        }
        return false;
    }

    const placeBet = async () => {
        if(betSlip.every(bet => bet.betSlipValidated) && wager && payout){
            const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
            };
            const myBets = [];
            betSlip.forEach((bet, i)=>{
                var betStr = bet.subjectName + " " + bet.selectedBetOption1;
                if(bet.selectedBetOption2)
                    betStr = betStr + " " + bet.selectedBetOption2;
                if(bet.selectedSpreadSign)
                    betStr = betStr + " " + bet.selectedSpreadSign;
                if(bet.selectedSpreadValue)
                    betStr = betStr + " " + bet.selectedSpreadValue;
                myBets[i] = betStr;
            });
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
        }
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
                            {i > 0 &&
                            <IconButton
                                onClick={()=>handleDelete(i)}
                            >
                                <DeleteIcon/>
                            </IconButton>}
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

export default CreateBet;