import './myStyles.css';
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function MessageOthers({props}) {
    console.log("MessageOthers props!::",props);
    const dispatch = useDispatch();
    return (
        <div className="MessageOthers">
            <div className="othersMessageBox">
                <p className="convo-icon">{props.sender.name[0]}</p>
                <div className="other-text-content">
                    <p className="convo-title">{props.sender.name}</p>
                    <p className="convo-lastMessage">{props.content}</p>
                    <p className="self-timestamp">12:00am</p>
                </div>
            </div>
        </div>
    );
}

export default MessageOthers;