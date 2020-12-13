import React, { useState , useEffect } from 'react';
import './Chats.css';
import MakeChat from '../MakeChat/MakeChat';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

const Chats = ({ history }) => {
    var userId;
    const [lists, setLists] = useState([]);
    const location =  useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const enterChat = (e, value) => {
        history.push({
            pathname: '/chat/default',
            state: value
          });
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    const logoutView = () => {
        if( $("#logout").css("display")!=="none")
            $("#logout").css("display","none");
        else
            $("#logout").css("display","block");
        

    }
    const logout = () => {

        console.log(location.state.userId);

        axios.get('http://3.35.140.126:9000/chat/room-list?????????',
            {userId : location.state.userId}
        )
        .then(function (response) {
        })
        .catch(function (error) {
            history.push( '/login');
            console.log(error);
        });
        

    }
    

    const list = ()=>{
        axios.get('http://3.35.140.126:9000/chat/room-list', 
            {userId : location.state.userId}
        )
        .then(function (response) {
            setLists([...lists,{
                image : 'aa.jpg',
                title : "chat1",
                chatId : "1"
            },{
            
                image : 'bb.jpg',
                title : "chat2",
                chatId : "2"
            },{
            
                image : 'cc.jpg',
                title : "chat3",
                chatId : "3"
            }]);
        })
        .catch(function (error) {
            console.log(error);
    });
    }
    
    const chatList = lists.map((list, index) =>
            <div className="chatBoxInner" key={index}>
                <div className="leftSection">
                    <div className="img" >{userId}</div>
                    <div className="title">{list.title}</div>
                </div>
                <div className="rightSection">
                    <button className="enterBtn" type="submit" onClick={(e) => {enterChat(e,{roomId:index,userId:location.state.userId})}}></button>
                </div>
            </div>
    );
    useEffect(() => {
        list();
    }, []);

    return (
        <div className="chats">
            <div className="header">
                <div id="title">채팅</div>
                <div id='icons'>
                    <li></li>
                    <li onClick = {logoutView}>
                        <ul>
                            <li id="logout" onClick = {logout}>로그아웃</li>
                            <li></li>
                        </ul>
                        </li>
                </div>
                    
            </div>
            <div className="chatBoxList">
                {chatList}
            </div>
            <div className="footer">
                <div className="friends"></div>
                <div className="chatList"></div>
                <div className="etc"></div>
                <div className="makeChat" onClick={openModal}></div>
                <MakeChat isOpen={isModalOpen} close={closeModal} history={history}/>
            </div>
        </div>
    );
}

export default Chats;