import React, {useState} from 'react';
import './Chat.css';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

function output(value){
    //서버에서 데이터 받기
    $("#chat_view").prepend('<div class = "chat_op"> <p class = "chat_p_p">상대방 : '+value+'</p></div>');
}

function input(value){
    //서버에 데이터 전송
    $("#chat_view").prepend('<div class = "chat_p"> <p class = "chat_p_p"> 나 : '+value+'</p></div>');
}


const Chat = ({history}) => { 
    const [chatInfo, setChat] = useState(
        {
            member: "",
            chat: ""
        }
    );

    const { member, chat } = chatInfo;

    const out = (e) =>{
        //방나가기 통신 넣기.
        $("#chat_view").prepend('<div class = "chat_cp"> <p class = "chat_p_p">'+''+'님이 방을 나갔습니다.'+'</p></div>');
        //라우터 넣기. 
        history.push('/chats');
    }


    const handleKeyUp = (e) => {
        if (e.key == 'Enter') {
            console.log(chat);
    
            input(chat);
            output(chat);
            
            const { value, name } = e.target;
            setChat({
                ...chatInfo,
                [name]: ''
            });
        }
    }
    
    const handleChange = (e) => {
        console.log('handleChange');
        const { value, name } = e.target;
        setChat({
            ...chatInfo,
            [name]: value
        });
    }

    return(
       <div id="chat">
            <div id="chat_header">
                    {/* <div className="header_1">
                        <div className="inlineStyle">
                        </div>
                        <div className="inlineStyle">
                            <div><p>리액트</p></div>
                        </div>
                    </div>
                    <div className="header_2">
                        <button className="gohome" onClick={out}>나가기</button>
                    </div> */}
                <div className="left">chat title</div>
                <div className="center"></div>
                <div className="right">
                    <button className="gohome" onClick={out}>나가기</button>
                </div>
            </div>
            <div id="chat_view"></div>
            <div id="chat_input"> 
                <input 
                    id="inputBox"
                    type="text" 
                    name="chat" 
                    value={chat} 
                    onChange={handleChange} 
                    onKeyUp={handleKeyUp}
                /> 
            </div>
        </div>
    );
}

export default Chat;