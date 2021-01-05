import React, { useState,useEffect } from 'react';
import './Chat.css';
import $ from "jquery";
import 'react-stomp';
import SockJS from 'sockjs-client';
import { useLocation } from 'react-router-dom';
import Stomp from 'stompjs';
import Api from './../Api';

var a = [{name : "test",message:"test1"},{name : "test",message:"test2"},{name : "test",message:"test3"},{name : "test",message:"test4"},{name : "test",message:"test5"},
{name : "test",message:"test1"},{name : "test",message:"test2"},{name : "test",message:"test3"},{name : "test",message:"test4"},{name : "test",message:"test5"}
,{name : "test",message:"test1"},{name : "test",message:"test2"},{name : "test",message:"test3"},{name : "test",message:"test4"},{name : "test",message:"test5"}
,{name : "test",message:"test1"},{name : "test",message:"test2"},{name : "test",message:"test3"},{name : "test",message:"test4"},{name : "test",message:"test5"}]

var pageNum = 20; //20개씩

//웹소켓 설정//
var stompClient;
    var sender = localStorage.getItem('id');
    var chatId;
	
	//연결//
	function connect(){
		//SockJS, STOMP관련 객체 생성//
		var socket = new SockJS('http://3.35.140.126:9000/websocket');
		stompClient = Stomp.over(socket);
		
		stompClient.connect({}, function(){
			//메세지를 받는다. 각각의 구독//
			stompClient.subscribe('/topic/chat/'+ chatId, function(msg){

                const response = JSON.parse(msg.body);

                if(response.name == sender){ //본인아이디와 비교
                    console.log(response);
                    input(response,"set");
                }else{
                    output(response,"set");
                }
			});

			//입장글//
			stompClient.send("/app/chat/"+chatId, {}, JSON.stringify({'message':' 님이 입장하였습니다', 'name':''+sender}));
		});
	}
	
	//연결해제//
	function disconnect() {
	    	if (stompClient !== null) {
	    		stompClient.send("/app/chat/"+chatId, {}, JSON.stringify({'message':'님이 나갔습니다', 'name':+sender}));
	    		stompClient.disconnect();
	    	}
	}
	
	//메세지 전송//
	function sendMessage(text){
		stompClient.send("/app/chat/"+chatId, {}, JSON.stringify({'message':text, 'name':''+sender}));
	}
	
    //상대방메세지
    function output(value,check){
        console.log(this);
        if(check == "page")
            $("#chat_view").append('<div class = "chat_op"> <p class = "chat_o_p">'+value.name+': '+value.message+'</p></div>');
        else if(check == "set")
            $("#chat_view").prepend('<div class = "chat_op"> <p class = "chat_o_p">'+value.name+': '+value.message+'</p></div>');
    }

    //본인메세지
    function input(value,check){
        if(check == "page")
            $("#chat_view").append('<div class = "chat_p"> <p class = "chat_c_p">'+value.name+': '+value.message+'</p></div>');
        else if(check == "set")
            $("#chat_view").prepend('<div class = "chat_p"> <p class = "chat_c_p">'+value.name+': '+value.message+'</p></div>');
    }

    //돔에 채팅글 넣는 함수

    function chatSet(chatList,check){

        for(let s = 0; s<chatList.length;s++){
            if(true) //본인 이름과 같으면 input 아니면 output
            output(chatList[s],check);
        }

    }

    //스크롤 페이징 함수
    //let sw =  true;
    function scrollCheck(){
        $('#chat_view').scroll(function(){   //스크롤이 최하단 으로 내려가면 리스트를 조회하고 page를 증가시킨다.
            // console.log($('#chat_header').height());
            // console.log($('#chat_input').height());
            // console.log($('#chat_view')[0].scrollHeight+"scrollHeight~~~");
            // console.log($('#chat_view')[0].scrollTop+"scrollTop~~~");
            // console.log($('#chat_view'));
            // console.log($('#chat').height()+"chatheight~~~");
            // console.log($('#chat_view')[0].offsetHeight+"offsetHeight~~~");
            // console.log($('#chat_view').scrollTop()*-1);
            // console.log($('#chat').height() -$('#chat_header').height() - $('#chat_input').height() +"~~값");
            // console.log($('#chat_view').height());
            // console.log($('#chat_view')[0].scrollHeight <= $('#chat_view')[0].offsetHeight + $('#chat_view').scrollTop()*-1);
            //스크롤 높이 =< chat_viewHegiht + chat_viewscrollTop *-1
            
            if($('#chat_view')[0].scrollHeight <= $('#chat_view')[0].offsetHeight + $('#chat_view').scrollTop()*-1){
                console.log('새로만들기');
                //sw = false;  

                paging();
                //chatSet([{num : 100,name : "testaaaaaaaa",message:"test1aaaaaaa"}],"page");

                //  getList(page);
                //   page++;   
            } 
        });

        //$(window).scrollTop() <= $(document).height() - $(window).height())


    }

    //서버통신 함수

    const paging = ()=>{
        Api({params: pageCheck() , apiname: 'paging'})
        .then(function (response) {

            console.log(response+"결과값");
            chatSet(response,"page");
           
        })
        .catch(function (error) {

            chatSet([{num : 100,name : "testaaaaaaaa",message:"test1aaaaaaa"}],"page");
            console.log(error);
    });
    }




    //페이지 확인 함수

    function pageCheck(){

        let startPageNum = $("#chat_view").children().last();
        let endPageNum = startPageNum + pageNum;
        let obj = {};
        obj['startPageNum'] = startPageNum;
        obj['endPageNum']= endPageNum;
        console.log(obj);
        
        return obj
    }

    
    


const Chat = (props:any) => { 
    const [chatInfo, setChat] = useState(
        {
            name: "",
            chat: ""
        }
    );

    useEffect(() => {
        scrollCheck();
        chatSet(a,"set");
        window.onpopstate = function (event) {
            disconnect();
            //라우터 넣기.
            props.history.push('/chats');
        }
          
        // console.log(location.state);
        // sender = localStorage.getItem('id');
        chatId = props.match.params.id;
        connect();
     }, []);

    const { name, chat } = chatInfo;

    const out = (e) =>{
        //방나가기 통신 넣기.
        disconnect();
        //라우터 넣기.
        console.log(history);
        props.history.push('/chats');
    }


    const handleKeyUp = (e) => {
        if (e.key == 'Enter') {
            console.log(chat);
    
            if(chat != "")
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
                <div className="left">{chatId}</div>
                <div className="center"></div>
                <div className="right">
                    <button className="gohome" onClick={out}></button>
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
                    ui-autocomplete="off"
                /> 
            </div>
        </div>
    );
}

export default Chat;