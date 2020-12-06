import React, { useState , useEffect } from 'react';
import './Chats.css';
import MakeChat from '../MakeChat/MakeChat';
import {useLocation } from 'react-router-dom';
import axios from 'axios';


const Chats = ({ history }) => {

    const [lists, setList] = useState([]);

    const location =  useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const enterChat = (e,value) => {
        console.log(e);
        console.log(value);
        history.push({
            pathname: '/chat/default',
            search: '?query=abc',
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
            {userId : location.state.userId}
        )
        .then(function (response) {
            setList([...response.data.list,{
                image : 'aa.jpg',
                title : "1번",
                chatNo : "1"
            },{
            
                image : 'bb.jpg',
                title : "2번",
                chatNo : "2"
            },{
            
                image : 'cc.jpg',
                title : "3번",
                chatNo : "3"
            }]);
        })
        .catch(function (error) {
            console.log(error);
    });
    }
    
    const chatList = lists.map((list, index) =>
            <div className="chatBoxInner" key={index}>
                <div className="leftSection">
                    <div className="img" ></div>
                    <div className="title">{list.title}</div>
                </div>
                <div className="rightSection">
                    <button className="enterBtn" type="submit" onClick={(e) => {enterChat(e,{roomId:index,userId:location.state.userId})}}>입장하기</button>
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