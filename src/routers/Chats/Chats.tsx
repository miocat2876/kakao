import React, { useState , useEffect } from 'react';
import './Chats.css';
import MakeChat from '../MakeChat/MakeChat';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Api from './../Api';

const Chats = ({ history }) => {
    var userId:string = localStorage.getItem('id');
    const [lists, setLists] = useState([]);
    const location =  useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    

    const [searchList, setSearchList] = useState(
        {
            searchList: "",
        }
    );


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
    // const logoutView = () => {
    //     if( $("#logout").css("display")!=="none")
    //         $("#logout").css("display","none");
    //     else
    //         $("#logout").css("display","block");
        

    // }
    const logout = () => {

        console.log(location.state.userId);

        Api({params: {userId : location.state.userId} , apiname: 'logOut'})
        .then(function (response) {

            console.info(response);
            if(response.data.return == 'success')
                history.push('/login');
            
        })
        .catch(function (error) {
            
            console.log(error);
        });
        

    }

    const listSearch = () => {
        history.push('/search');
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
            setSearchList({
                ...searchList,
                [name]: value
            });

            console.log(searchList);
    }
    
    const list = ()=>{
        Api({params: {userId : userId} , apiname: 'chatList'})
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
                    <li onClick={listSearch}></li>
                    <li id="settings">
                        <label htmlFor="toggle"></label>
                        <input type="checkbox" id="toggle" />
                        <ul id="nav">
                            <li id="logout">로그아웃</li>
                            <li id='setting'>설정</li>
                        </ul>
                    </li>
                </div>  
            </div>
            {/* <div id="searchInput"><input type="text" name = "searchList" onChange={handleChange}/></div> */}
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