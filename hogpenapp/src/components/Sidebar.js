import './myStyles.css';
import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { myContext } from "./MainContainer";
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../Images/hoghunter.png"

function Sidebar() {
    const navigate = useNavigate();
    const { refresh } = useContext(myContext);
    const [dropdown, setDropdown] = useState(false);
    const [friendsList, setFriendsList] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));

    const nav = useNavigate();
    if (!userData) {
      console.log("User not Authenticated");
      nav("/");
    }
  
    const user = userData.data;
    useEffect(() => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  
      axios.get("http://localhost:8080/user/fetchUsers", config).then((response) => {
        console.log("Data refresh in sidebar ", response.data);
        setFriendsList(response.data);
      });
    }, [refresh, user.token]);
    
  return (
    <div className="Sidebar">

        <div className={dropdown ? "sidebar-header-open" : "sidebar-header-closed"}>
          <IconButton
            onClick={()=>{
              setDropdown(!dropdown);
            }}
          >
              <MenuIcon/>
          </IconButton>
          <span className="profile-name">Hogpen Bets</span>
          <img src={logo} style={{height:"2rem", width:"2rem"}} alt="logo"/>
        </div>

        {dropdown && 
        <div className="dropdown-menu">
          <span className="dropdown-option"
            onClick={()=>{
              navigate("bets?user="+userData.data._id+"&name="+userData.data.name);
            }}
          >
            My Bets
          </span>
          <span className="dropdown-option"
            onClick={()=>{
              navigate("bets");
            }}
          >
            Betting Dashboard
          </span>
          <span className="dropdown-option"
            onClick={()=>{
              navigate("create-bet");
            }}
          >
            Create a Bet
          </span>
          <span className="dropdown-option">
            Profile
          </span>
          <span className="dropdown-option">
            Log Out
          </span>
        </div>}

        <div className="sidebar-search">
            <IconButton>
                <SearchIcon/>
            </IconButton>
            <input className="search-box" placeholder="search"/>
        </div>
        <div className="sidebar-conversations">
        {friendsList.map((friend, index) => {
            return (
              <div
                key={index}
                className="ConversationsItem"
                onClick={()=>{
                  navigate("bets?user="+friend._id+"&name="+friend.name);
                }}
              >
                <p className="convo-icon">
                  {friend.name[0]}
                </p>
                <p className="convo-title">
                  {friend.name}
                </p>

                <p className="convo-lastMessage">
                Click here to see bets made by {friend.name}
                </p>
              </div>
            );
        })}
        </div>
    </div>
  );
}

export default Sidebar;
