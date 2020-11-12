import React from 'react';
import './Login.css';
// import kakaoLogo from './images/kakaoLogo.PNG'

const Login = ({ history }) => {
    const goChats = () =>{
        history.push('/chats');
    }
    return (
    <>
    <div id="wrap">
        <div id="main">
            <div>
                <img src="/images/kakaoLogo.PNG"/>
            </div>
            <div id = "login">
                <div id = "login_input">
                    <input type="text" placeholder="카카오계정"/>
                    <input type="password" placeholder="비밀번호"/>
                </div>
                <div id = "login_button">
                    <button onClick={goChats}><p>로그인</p></button>
                </div>
                <div id="login_auto">
                    <input type="checkbox"/><p>자동로그인</p>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Login;