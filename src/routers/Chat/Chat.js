import React, {useState,useEffect} from 'react';
import './Chat.css';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import 'react-stomp';
import SockJS from 'sockjs-client';
import {useLocation } from 'react-router-dom';

//웹소켓 설정//
<<<<<<< HEAD
=======

>>>>>>> 7b2760d94f5f766697ac06889d4148f8be9ef7c8
    var stompClient;
    var sender = 'my';
    var roomId = 'room1';
	
	//연결//
	function connect(){
		//SockJS, STOMP관련 객체 생성//
		var socket = new SockJS('http://3.35.140.126:9000/websocket');
		stompClient = Stomp.over(socket);
		
		stompClient.connect({}, function(){
			//메세지를 받는다. 각각의 구독//
			stompClient.subscribe('/topic/chat/' + roomId, function(msg){

                const response = JSON.parse(msg.body);

                if(response.name == sender){ //본인아이디와 비교
                    console.log(response);
                    input(response);
                }else{
                    output(response);
                }
			});

			//입장글//
			stompClient.send("/app/chat/"+roomId, {},JSON.stringify({'message':' 님이 입장하였습니다', 'name':''+sender}));
		});
	}
	
	//연결해제//
	function disconnect() {
	    	if (stompClient !== null) {
	    		stompClient.send("/app/chat/"+roomId, {},JSON.stringify({'message':sender  + '님이 나갔습니다', 'name':''+sender}));
	    		stompClient.disconnect();
	    	}
	}
	
	//메세지 전송//
	function sendMessage(text){
		stompClient.send("/app/chat/"+roomId, {}, JSON.stringify({'message':text, 'name':''+sender}));
	}
	
    //상대방메세지
    function output(value){
        $("#chat_view").prepend('<div class = "chat_op"> <p class = "chat_o_p">{'+value.name+'} '+value.message+'</p></div>');
    }

    //본인메세지
    function input(value){
        $("#chat_view").prepend('<div class = "chat_p"> <p class = "chat_c_p">{'+value.name+'} '+value.message+'</p></div>');
    }


const Chat = ({history}) => { 
    const [chatInfo, setChat] = useState(
        {
            name: "",
            chat: ""
        }
    );

    const location =  useLocation();

    useEffect(() => {

        window.onpopstate = function (event) {

            disconnect();
            //라우터 넣기.
            history.push({
                pathname: '/chats',
                search: '?query=abc',
                state: {userId : location.state.userId}
            });
            
        }
          
        

        console.log(location.state);
        sender = location.state.userId;
        roomId = location.state.roomId;
        connect();
     }, []);

    const { name, chat } = chatInfo;

    const out = (e) =>{
        //방나가기 통신 넣기.
        disconnect();
<<<<<<< HEAD
        $("#chat_view").prepend('<div class = "chat_cp"> <p class = "chat_p_p">'+sender+'님이 방을 나갔습니다.'+'</p></div>');
        //라우터 넣기. 
=======
        //라우터 넣기.
<<<<<<< HEAD
>>>>>>> 7b2760d94f5f766697ac06889d4148f8be9ef7c8
        history.push('/chats');
=======
        history.push({
            pathname: '/chats',
            search: '?query=abc',
            state: {userId : location.state.userId}
          });
>>>>>>> 78d99b3f40c817e6d5f1c036c9d48da7f46180d9
    }

    //채팅 입력
    const handleKeyUp = (e) => {
        if (e.key == 'Enter') {
            console.log(chat);
<<<<<<< HEAD
=======
    
            if(chat != "")
>>>>>>> 7b2760d94f5f766697ac06889d4148f8be9ef7c8
            sendMessage(chat);
            
            // const { value, name } = e.target;
            // setChat({
            //     ...chatInfo,
            //     [name]: ''
            // });
        }
    }
    
    // const handleChange = (e) => {
    //     console.log('handleChange');
    //     const { value, name } = e.target;
    //     setChat({
    //         ...chatInfo,
    //         [name]: value
    //     });
    // }

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
                <div className="left">채팅방</div>
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
<<<<<<< HEAD
                    // onChange={handleChange} 
=======
                    onChange={handleChange}
>>>>>>> 78d99b3f40c817e6d5f1c036c9d48da7f46180d9
                    onKeyUp={handleKeyUp}
                    autocomplete="off"
                /> 
            </div>
        </div>
    );
}

export default Chat;