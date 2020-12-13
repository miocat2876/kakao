import React, { useState , useEffect } from 'react';
import './Chats.css';
import MakeChat from '../MakeChat/MakeChat';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Chats = ({ history }) => {
    var userId = localStorage.getItem('id');
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

    const list = ()=>{
        axios.get('http://3.35.140.126:9000/chat/room-list', 
            {userId : userId}
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
                    {/* 유저 프로필사진 조회 처리  */}
                    <div className="img" ></div> 
                    <div className="title">{list.title}</div>
                </div>
                <div className="rightSection">
                    <button className="enterBtn" type="submit" onClick={(e) => {enterChat(e,{roomId: index, userId: userId})}}></button>
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
                    <li></li>
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