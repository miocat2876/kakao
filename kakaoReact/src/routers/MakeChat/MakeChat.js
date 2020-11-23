import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './MakeChat.css';

const MakeChat = (props) => {

    const [chatInfo, setChatInfo] = useState({
        id: "",
        chatTitle: "",
        chatRoomId: ""
    });

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
            props.history.push('/chat/1');
            // <Link to="/chat/1"/>
        })
        .catch(res =>{
            //등록 실패 시
        })
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