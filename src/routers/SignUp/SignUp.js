import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import kakaoLogo from '../../images/kakaoLogo.png';

const SignUp = ({history}) =>{
    const [member, setMember] = useState({
        id: "",
        pw: "",
        pwCheck: "",
        name: "",
        phone: "",
        img: ""
        // let bgColor;
    });

    const [valid, setValid] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const { id, pw, pwCheck, name, phone, img } = member;

    const onChangeValue = (e) => {
        const { value, name } = e.target;
        
        setMember({
            ...member,
            [name]: value
        });

        if ( name === 'id' ){ //아이디 값 중복 체크
            
            axios.post('http://3.35.140.126:9000/user/duplicate_check',
             id
            )
            .then(function(response){  
                console.log('success');

                if(response === 'success'){
                    //성공
                }
                else{
                    //실패
                }
                // const {data : {errorMsg}} = response;
                setValid('true');
                
            })
            .catch(function(error){
                console.log('error');
                setValid('false');
                // alert('이미 사용중인 아이디입니다.');
            })
        }
    }

    const submit = (ev) => {
        ev.preventDefault();
        // props.onCreate(this.state);
        
        if(!id | !pw | !name | !phone){ //전체 입력 확인
            alert('모든 값이 입력되지 않았습니다.');
        }
        else{
            if(pw !== pwCheck){ //비밀번호 입력 값 확인
                alert('비밀번호 확인이 필요합니다.');
            }
            else{
                axios.post('http://3.35.140.126:9000/user/join', //회원 가입 등록
                    member
                )
                .then(function (response) {
                    console.log(response);
                    alert('반갑습니다.');
                    setMember({ //초기화
                        id: "",
                        pw: "",
                        name: "",
                        phone: "",
                        img: ""
                    });
                    goLogin();
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    }

    const goLogin = () => {
        history.push('/login');
    }

    const divStyle = {
        color: 'blue',
        fontSize: '12px'
    };

    const changeBoxColor = {
        border: (valid === 'true') ? "2px solid lightgreen" : "2px solid red",
        color: (valid === 'true') ? "" : "red"
    };

    const checkStyle = {
        color: 'red',
        fontSize: '12px'
    }
    //리턴에 영향을 주고 싶으면 state에 둬야한다.
    return(
        <main className="signup" >
                <form className="form">
                    <div className="inner">
                        <div className="logoContainer">
                            <img src={kakaoLogo}/>
                        </div>
                        <div className="container">
                        <input
                            style={changeBoxColor}
                            className="box"
                            placeholder="아이디"
                            value={id}
                            onChange={onChangeValue}
                            name="id">
                        </input>
                        {/* {/* {(valid === 'true' && <div style={divStyle}>사용 가능한 아이디입니다.</div>)} */}
                        {/* {(valid === 'false' && <div style={divStyle}>이미 사용중인 아이디입니다.</div>)} */}
                        <input
                            type="password"
                            className="box"
                            placeholder="비밀번호"
                            value={pw}
                            onChange={onChangeValue}
                            name="pw">
                        </input>
                        <input
                            type="password"
                            className="box"
                            placeholder="비밀번호 확인"
                            name="pwCheck"
                            value={pwCheck}
                            onChange={onChangeValue}>
                        </input>
                        {(passwordCheck === 'false' && <div style={checkStyle}>입력하신 비밀번호 확인 부탁드립니다.</div>)}
                        <input
                            className="box"
                            placeholder="이름"
                            value={name}
                            onChange={onChangeValue}
                            name="name">
                        </input>
                        <input
                            className="box"
                            placeholder="휴대폰 번호 (ex. 010-0000-0000)"
                            value={phone}
                            onChange={onChangeValue}
                            name="phone">
                        </input>
                        {/* <div className="imgContiner">
                            <input
                                type="file"
                                id="imgFile"
                                placeholder="프로필 사진"
                                value={img}
                                onChange={onChangeValue}
                                name="img">
                            </input>
                            <label for="imgFile">파일</label>
                        </div> */}
                        <div className="imgContainer">
                            <label>
                                파일선택
                                <input type="file" onChange="javascript:document.getElementById('fileRoute').value=this.value" />
                            </label>
                            <input type="text" readonly="readonly" id="fileRoute"/>
                        </div>
                        </div>
                        <button className="btn" type="submit" onClick={submit}>sign up</button>
                    </div>
                </form>
            </main>
    );
}

export default SignUp;