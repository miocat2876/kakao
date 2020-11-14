import React from 'react';
import './Chat.css';

const Chat = ({ history, match : { params : { id }}}) => {
    return(
        <div className="chat">
            <div className="header">
                <div className="headerInner">
                    <div className="text">chat's id: {id}</div>
                </div>
            </div>
            <div className="chatInner">
                <div className="main">
                    <div className="chatList"></div>
                    <div className="inputText"></div>
                </div>
            </div>
            <div className="footer">
                <div className="footerInner"></div>
            </div>
            
        </div>
    );
}

export default Chat;