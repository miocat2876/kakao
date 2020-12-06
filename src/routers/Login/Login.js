import React, {useState,useEffect} from 'react';
import './Login.css';
import axios from 'axios';
import kakaoLogo from '../../images/kakaoLogo.png';

const Login = ({ history }) => {
    const [login, setLogin] = useState(
        {
            id: "",
            pw: "",
            loginChk : false
        }
    );

    const { id, pw, loginChk } = login;

    const setLocal = () =>{
        if(loginChk==true)
            localStorage.setItem('login', JSON.stringify(login));
        else
            localStorage.setItem('login', JSON.stringify({id: "",pw: "",loginChk : false}));
    }

    const getLocal = (callback) =>{
        let val = JSON.parse(localStorage.getItem('login'));
        if(Object.keys(val).length>0){
            console.log(val);
            setLogin(val);
            callback(val.loginChk);
        }
    }

    useEffect(() => {
        getLocal(function(loginChk){
            setTimeout(() => {
                if(loginChk===true){
                    if(confirm("로그인 하시겠습니까?")){
                        handleClick();
                    }
                }
            }, 1000);
        });
        
           
        
       

    }, []);



    const goChats = (id) =>{
        history.push(
            {
            pathname: '/chats',
            search: '?query=abc',
            state: { userId: id }
          }
        
        );
    }

    const handleClick = () => {
        axios.post('http://3.35.140.126:9000/user/login', 
            login
          )
          .then(function (response) {
               if(response.data.return !== "fail"){
                    setLocal();
                    goChats(login.id);
               }else{
                    alert('로그인정보가 일치하지 않습니다.');
               }
          })
          .catch(function (error) {
                console.log(error);
          });
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
<<<<<<< HEAD
        setLogin({
            ...login,
            [name]: value
        });

        console.log({history});
=======
        console.log(loginChk);
        if(e.target.type =="checkbox"){
            setLogin({
                ...login,
                [name]: e.target.checked
            }); 
        }else{
            setLogin({
                ...login,
                [name]: value
            });
        }
>>>>>>> 7b2760d94f5f766697ac06889d4148f8be9ef7c8
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
                        <input type="checkbox" name="loginChk" checked = {loginChk} onChange = {handleChange}/><p>자동로그인</p>
                    </div>
                    <a id="signUp" onClick={signUp}>회원가입</a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;