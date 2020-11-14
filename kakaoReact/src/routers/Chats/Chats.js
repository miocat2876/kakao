import React from 'react';
import './Chats.css';

const Chats = ({ history }) => {

    const enterChat = () => {
        history.push('/chat/default');
    }
    return (
        <div className="chats">
            <div className="header"></div>
            <div className="chatBoxList">
                <div className="chatBox">
                    <div className="chatBoxInner">
                        <div className="leftSection">
                            <div className="img"></div>
                            <div className="userName">chat1</div>
                        </div>
                        <div className="rightSection">
                            <button className="enterBtn" type="submit" onClick={enterChat}>Enter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default Chats;