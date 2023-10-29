import './myStyles.css';
import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { myContext } from "./MainContainer";
import SportsFootballIcon from '@mui/icons-material/SportsFootball';

function Sidebar() {
    const navigate = useNavigate();
    const { refresh } = useContext(myContext);
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
        <div className="sidebar-header">
            <div className="bet-title">
                <IconButton
                  onClick={()=>{
                    navigate("bets?user="+userData.data._id+"&name="+userData.data.name);
                  }}
                >
                    <AccountCircleIcon/>
                </IconButton>
                {userData.data.name}
            </div>

            <div>
                <IconButton 
                    onClick={()=>{
                        navigate("users");
                    }}
                >
                    <PersonAddIcon/>
                </IconButton>
                {/* <IconButton
                    onClick={()=>{
                        navigate("groups");
                    }}
                >
                    <GroupAddIcon/>
                </IconButton> */}
                <IconButton
                    onClick={()=>{
                        navigate("create-bet");
                    }}
                >
                    <AddCircleIcon/>
                </IconButton>
                <IconButton
                  onClick={()=>{
                    navigate("bets");
                  }}
                >
                  <SportsFootballIcon/>
                </IconButton>
            </div>
        </div>
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
