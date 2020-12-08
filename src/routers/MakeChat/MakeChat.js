import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './MakeChat.css';
import User from './User';

const MakeChat = (props) => {

    const [chatInfo, setChatInfo] = useState({
        id: "",
        chatTitle: "",
        chatRoomId: ""
    });

    const [fridens, setFriends] = useState({});

    const {isOpen, close, userId} = props;
    const {id, chatTitle, chatRoomId} = chatInfo;

    const onChangeValue = (e) => {
        const { value, name } = e.target;
        
        setChatInfo({
            ...chatInfo,
            [name]: value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setChatInfo({ //사용자 정보 받아 설정
            ...chatInfo,
            id: {userId}
        });
        axios.post('http://3.35.140.126:9000/chat/room-create', chatInfo)
        .then(res => {
            //등록 성공 시
            console.log(props);
            axios.post
            props.history.push('/chat/1');//리턴받은 방번호로 이동
            // <Link to="/chat/1"/>
        })
        .catch(res =>{
            //등록 실패 시
        })
    }

    const users = [{id: "test@naver.com"}, {id: "test@gmail.com"}, {id: "test@naver.com"}, {id: "test@gmail.com"},{id: "test@naver.com"}, {id: "test@gmail.com"}];

    //1. 친구 조회  2. 친구 선택 후 방제목 입력과 생성  3. 방이동 4. 서버에 초대한 사람들 리스트 보내주기 방번호랑 
    const userList = () => {
        // axios.get('http://3.35.140.126:9000/user/list')
        // .then(res => {
            
        // })
        // .catch(res => {

        // })

    }
 
    return(
        <div>
            {isOpen ? (
                <div className="modal">
                    <div onClick={close}/>
                        <div className="modalContents">
                            <div className="close" onClick={close}>&times;</div>
                            <div className="contents">
                                <input
                                    className="chatTitle"
                                    placeholder="채팅방 이름을 입력하세요"
                                    value={chatTitle}
                                    onChange={onChangeValue}
                                    name="chatTitle">
                                </input>
                                <div className="userList">
                                    {
                                        users.map(item => (
                                            <label className="item">
                                                {item.id}<input type="checkbox" name="user" value={item.id} className="chkbox" />
                                            </label>
                                        ))
                                    }
                                </div>
                                <button className="btn" onClick={onSubmit}>채팅방 생성</button>
                            </div>
                            
                        </div>
                    {/* </div> */}
                </div>
            ) : null}
        </div>
    );
}

export default MakeChat;