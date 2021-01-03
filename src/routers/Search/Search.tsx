import React, { useState , useEffect } from 'react'; //파라미터로 받을경우 삭제
import axios from 'axios';
import { useLocation } from 'react-router-dom'; //파라미터로 받을경우 삭제
import Api from './../Api';

const Search = () => {

    const location =  useLocation(); //파라미터로 받을경우 삭제
    const [lists, setLists] = useState([]); //파라미터로 받을경우 삭제
    const list = () => {
            Api({apiname : "chatList",
            params: {userId : location.state.userId,
                     chatId : '3'}
             })
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
    
    return (
        <div id="board">
            <div id="header">search component</div>
        </div>
    );
}

export default Search;