import { useNavigate } from 'react-router-dom';
import './myStyles.css';
import React from "react";

function ConversationsItem({props}) {
  const navigate = useNavigate();
  return (
    <div 
      className="ConversationsItem"
      onClick={()=>{
        navigate("chat")
      }}
    >
        <p className="convo-icon">{props.name[0]}</p>
        <p className="convo-title">{props.name}</p>
        <p className="convo-lastMessage">{props.lastMessage}</p>
        <p className="convo-timestamp">{props.timestamp}</p>
    </div>
  );
}

export default ConversationsItem;
