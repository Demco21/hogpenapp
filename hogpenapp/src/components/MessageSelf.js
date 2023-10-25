import './myStyles.css';
import React from "react";

function MessageSelf({props}) {
    console.log("Message self Prop : ", props);
    return (
        <div className="MessageSelf">
            <div className="selfMessageBox">
                <p>{props.content}</p>
                <p className="self-timestamp">12:00am</p>
            </div>
        </div>
    );
}

export default MessageSelf;