import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import kakaoLogo from '../../images/kakaoLogo.png';

const Login = ({ history }) => {
    const [login, setLogin] = useState(
        {
            id: "",
            pw: ""
        }
    );
    
    const { id, pw } = login;

    const goChats = () =>{
        history.push('/chats');
    }

    const handleClick = () => {
        // console.log(state);
        axios.post('http://3.35.140.126:9000/user/login', 
            login
          )
          .then(function (response) {
               if(response.data.fail !== "fail")
                goChats(); 
          })
          .catch(function (error) {
                console.log(error);
          });
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setLogin({
            ...login,
            [name]: value
        });
    }

    const signUp = () => {
        history.push('/signUp');
    }

    return (
    <div id="wrap">
        <div id="main">
            <div className="logoContainer">
                <img src={kakaoLogo}/>
            </div>
            <div className="section">
                <div id="login_input">
                    <input 
                        type="text" 
                        placeholder="카카오계정" 
                        value={id}
                        name="id"
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        placeholder="비밀번호"
                        value={pw}
                        name="pw"
                        onChange={handleChange}
                    />
                </div>
                <div id="login_button">
                    <button onClick={handleClick}><p>로그인</p></button>
                </div>
                <div id="login_auto">
                    <div id="loginAutoSection">
                        <input type="checkbox"/><p>자동로그인</p>
                    </div>
                    <a id="signUp" onClick={signUp}>회원가입</a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
