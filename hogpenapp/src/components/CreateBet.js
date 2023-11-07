import './myStyles.css';
import React, { useState, useEffect } from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateBet() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.data.token : null;
    const [betSlip, setBetSlip] = useState([{
        subject: "Team",
        subjectName:"",
        selectedBetOption1: "",
        selectedBetOption2: "",
        selectedBetOption3: "",
        betSlipValidated: false
    }]);
    const [wager, setWager] = useState(0);
    const [payout, setPayout] = useState(0);
    const subjectOptions = ["Team", "Player"];
    const teamBetOptions = ["", "Moneyline", "Spread", "Over", "Under"];
    const playerBetOptions = [
        "",
        "Over",
        "Under",
        "TD Scorer",
        "Rec TD Scorer",
        "Pass TD Scorer",
        "Rec Yds",
        "Pass Yds",
        "Rush Yds",
        "Receptions"
    ];
    const playerOverUnderOpts = [
        "",
        "Rec Yds",
        "Pass Yds",
        "Rush Yds",
        "TDs" 
    ];
    const gameOverUnderOpts = [
        "",
        "TDs",
        "Points",
        "Receptions",
        "Yards"
    ];

    const arr = [];
    for(let i=0; i<=1200; i++) {
        arr.push(i);
    }
    const numberVals = arr.map(n => n/2);
    const yardOpts = ["", ...numberVals];
    const spreadSignOpts = ["","+","-"];
    const tdScorerOpts1 = ["","First","Anytime",...numberVals];
    const tdScorerOpts2 = ["","Anytime",...numberVals];
    const receptionOpts = ["","First",...numberVals];
    const spreadOpts = ["",...numberVals];

    useEffect(()=>{
        if(token === null){
            navigate("/");
            return;
        }
    });

    const handleAdd=()=>{
        if(betSlip.every(bet => bet.betSlipValidated)){
            const newBetSlip = [...betSlip,
            {
                subject: "Team",
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
                selectedSpreadSig3: "",
                betSlipValidated: false
                }
        }
        if(e.target.id==="selectedBetOption1"){
            updatedBetSlip[index] = {...updatedBetSlip[index], 
                selectedBetOption2: "",
                selectedBetOption3: "",
                betSlipValidated: false
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
            if((bet.selectedBetOption1==="Spread" 
            || bet.selectedBetOption1 === "Over"
            || bet.selectedBetOption1 === "Under")
            && bet.selectedBetOption2 
            && bet.selectedBetOption3){
                return true;
            }
        }
        if(bet.subject==="Player" 
        && bet.subjectName){
            if(bet.selectedBetOption1 === "Over"
                || bet.selectedBetOption1 === "Under"){
                if(bet.selectedBetOption2 && bet.selectedBetOption3){
                    return true;
                }
            }
            else if(bet.selectedBetOption1
                && bet.selectedBetOption2){
                    return true;
                }
        }
        return false;
    }

    const formatBets = () => {
        const myBets = [];
        betSlip.forEach((bet, i)=>{
            var betStr = bet.subjectName + " " + bet.selectedBetOption1;
            if(bet.selectedBetOption2){
                betStr = betStr + " " + bet.selectedBetOption2;
            }
            if(bet.selectedBetOption3){
                if(bet.selectedBetOption1 === "Spread"){
                    betStr = betStr + bet.selectedBetOption3;
                }else{
                    betStr = betStr + " " + bet.selectedBetOption3;
                }
            }
            myBets[i] = betStr;
        });
        return myBets;
    }

    const placeBet = async () => {
        if(betSlip.every(bet => bet.betSlipValidated) && wager && payout){
            const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
            };
            const myBets = formatBets();
            await axios.post("http://localhost:5000/bets",
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
                <p className="ug-title">Create a Bet</p>
            </div>
            <div className="create-bet-container">
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

                            {(bet.subject === "Team" || bet.subject === "Player" || bet.subject === "Game") && 
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

                            {(bet.subject === "Team" && bet.selectedBetOption1 === "Spread") 
                            && <select id="selectedBetOption2" name="selectedBetOption2" className="custom-select"
                                value={bet.selectedBetOption2} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {spreadSignOpts.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Team" && bet.selectedBetOption1 === "Spread") 
                            && <select id="selectedBetOption3" name="selectedBetOption3" className="custom-select"
                                value={bet.selectedBetOption3} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {spreadOpts.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Team"
                            && (bet.selectedBetOption1 === "Over" 
                            || bet.selectedBetOption1 === "Under" )) 
                            && <select id="selectedBetOption2" name="selectedBetOption2" className="custom-select"
                                value={bet.selectedBetOption2} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {yardOpts.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Team"
                            && (bet.selectedBetOption1 === "Over" 
                            || bet.selectedBetOption1 === "Under" )) 
                            && <select id="selectedBetOption3" name="selectedBetOption3" className="custom-select"
                                value={bet.selectedBetOption3} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {gameOverUnderOpts.map(option => (
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
                            || bet.selectedBetOption1 === "Rush Yards"
                            || bet.selectedBetOption1 === "Alt Yards")) 
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
                            && (bet.selectedBetOption1 === "Over" 
                            || bet.selectedBetOption1 === "Under" )) 
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
                            && (bet.selectedBetOption1 === "Over" 
                            || bet.selectedBetOption1 === "Under" )) 
                            && <select id="selectedBetOption3" name="selectedBetOption3" className="custom-select"
                                value={bet.selectedBetOption3} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {playerOverUnderOpts.map(option => (
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
                            
                            {(bet.subject === "Game" 
                            && (bet.selectedBetOption1 === "Over" 
                            || bet.selectedBetOption1 === "Under" )) 
                            && <select id="selectedBetOption2" name="selectedBetOption2" className="custom-select"
                                value={bet.selectedBetOption2} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {yardOpts.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {(bet.subject === "Game" 
                            && (bet.selectedBetOption1 === "Over" 
                            || bet.selectedBetOption1 === "Under" )) 
                            && <select id="selectedBetOption3" name="selectedBetOption3" className="custom-select"
                                value={bet.selectedBetOption3} 
                                onChange={(e)=>updateBetSlip(i, e)}>
                                {gameOverUnderOpts.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>}

                            {bet.betSlipValidated &&
                            <DoneOutlineRoundedIcon/>}

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