import './myStyles.css';
import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import ConversationsItem from './ConversationsItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';
import axios from "axios";
import { refreshSidebarFun } from "../features/refreshSidebar";
import { myContext } from "./MainContainer";
import SportsFootballIcon from '@mui/icons-material/SportsFootball';

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lightTheme = useSelector((state) => state.themeKey);
    // const refresh = useSelector((state) => state.refreshKey);
    const { refresh, setRefresh } = useContext(myContext);
    const [conversations, setConversations] = useState([]);
    // console.log("Conversations of Sidebar : ", conversations);
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log("Data from LocalStorage : ", userData);
    const nav = useNavigate();
    if (!userData) {
      console.log("User not Authenticated");
      nav("/");
    }
  
    const user = userData.data;
    useEffect(() => {
      // console.log("Sidebar : ", user.token);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  
      axios.get("http://localhost:8080/chat/", config).then((response) => {
        console.log("Data refresh in sidebar ", response.data);
        setConversations(response.data);
        // setRefresh(!refresh);
      });
    }, [refresh]);
    
  return (
    <div className="Sidebar">
        <div className="sidebar-header">
            <div className="bet-title">
                <IconButton
                  onClick={()=>{
                    navigate("bets?user="+userData.data._id+"&"+"name="+userData.data.name);
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
                        navigate("create-groups");
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
        {conversations.map((conversation, index) => {
          // console.log("current convo : ", conversation);
          if (conversation.users.length === 1) {
            return <div key={index}></div>;
          }
          if (conversation.latestMessage === undefined) {
            // console.log("No Latest Message with ", conversation.users[1]);
            return (
              <div
                key={index}
                onClick={() => {
                  console.log("Refresh fired from sidebar");
                  // dispatch(refreshSidebarFun());
                  setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => {
                    navigate(
                      "chat/" +
                        conversation._id +
                        "&" +
                        conversation.users[1].name
                    );
                  }}
                  // dispatch change to refresh so as to update chatArea
                >
                <div className="ConversationsItem">
                  <p className={"convo-icon" + (lightTheme ? "" : " dark")}>
                    {conversation.users[1].name[0]}
                  </p>
                  <p className={"convo-title" + (lightTheme ? "" : " dark")}>
                    {conversation.users[1].name}
                  </p>

                  <p className="convo-lastMessage">
                    Click here to start a new chat
                  </p>
                </div>
                  {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                {conversation.timeStamp}
              </p> */}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="ConversationsItem"
                onClick={()=>{
                  navigate("bets?user="+conversation.users[1]._id+"&"+"name="+conversation.users[1].name);
                }}
              >
                <p className={"convo-icon" + (lightTheme ? "" : " dark")}>
                  {conversation.users[1].name[0]}
                </p>
                <p className={"convo-title" + (lightTheme ? "" : " dark")}>
                  {conversation.users[1].name}
                </p>

                <p className="convo-lastMessage">
                  {conversation.latestMessage.content}
                </p>
                {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                {conversation.timeStamp}
              </p> */}
              </div>
            );
          }
        })}
        </div>
    </div>
  );
}

/*
{conversations.map((conversation) => {
    if (conversation.users.length === 1) {
        return <div key={index}></div>;
    }
    return (
        <ConversationsItem 
            props={conversation} 
            key={conversation.name}
        />
    )
})}
*/

export default Sidebar;
