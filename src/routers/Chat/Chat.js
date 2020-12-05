import React, {useState,useEffect} from 'react';
import './Chat.css';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import 'react-stomp';
import SockJS from 'sockjs-client';


//웹소켓 설정//
    var stompClient
    var sender = 'my';
    var roomId = 'room1';
	
	//연결//
	function connect(){
		//SockJS, STOMP관련 객체 생성//
		var socket = new SockJS('http://3.35.140.126:9000/websocket');
		stompClient = Stomp.over(socket);
		
		stompClient.connect({}, function(){
			//메세지를 받는다. 각각의 구독//
			stompClient.subscribe('/topic/chat/'+roomId, function(msg){

                const response = JSON.parse(msg.body);

                if(response.name == sender){ //본인아이디와 비교
                    input(response.message);
                }else{
                    output(response.message);
                }
			});

			//입장글//
			stompClient.send("/app/chat/"+roomId, {},JSON.stringify({'message':sender  + ' 님이 입장하였습니다', 'name':''+sender}));
		});
	}
	
	//연결해제//
	function disconnect() {
            
	    	if (stompClient !== null) {
	    		stompClient.send("/app/chat/"+roomId, {},JSON.stringify({'message':sender  + ' 님이 나갔습니다', 'name':''+sender}));
	    		stompClient.disconnect();
	    	}
	}
	
	//메세지 전송//
	function sendMessage(text){
		//send()부분에 매개변수로 MessageMapping을 입력//
        //세번째 인자로 보내고자 하는 정보를 JSON으로 설정하여 보낸다.(관련 VO존재 필요)//
        
		stompClient.send("/app/chat/"+roomId, {}, JSON.stringify({'message':text, 'name':''+sender}));
	}
	

    function output(value){
        //서버에서 데이터 받기
        $("#chat_view").prepend('<div class = "chat_op"> <p class = "chat_p_p">'+value+'</p></div>');
    }

    function input(value){
        //서버에 데이터 전송
        $("#chat_view").prepend('<div class = "chat_p"> <p class = "chat_p_p">'+value+'</p></div>');
    }


const Chat = ({history}) => { 
    const [chatInfo, setChat] = useState(
        {
            member: "",
            chat: ""
        }
    );

    useEffect(() => {
        connect();
     }, []);

    const { member, chat } = chatInfo;

    const out = (e) =>{
        //방나가기 통신 넣기.
        disconnect();
        //라우터 넣기.
        history.push('/chats');
    }


    const handleKeyUp = (e) => {
        if (e.key == 'Enter') {
            console.log(chat);
    
            sendMessage(chat);
            
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
                    onChange={handleChange} 
                    onKeyUp={handleKeyUp}
                /> 
            </div>
        </div>
    );
}

export default Chat;