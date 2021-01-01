import React, { useState } from 'react';
import axios from 'axios';
import kakaoLogo from '../../images/kakaoLogo.png';
import styled from 'styled-components';
import './SignUp.css';

const SignUp = ({history}:any) =>{
    const [member, setMember] = useState({
        id: "",
        pw: "",
        pwCheck: "",
        name: "",
        phone: "",
        profile: ""
    });

    const [valid, setValid] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const { id, pw, pwCheck, name, phone, profile } = member;

    const onChangeValue = (e:any) => {
        const { value, name } = e.target;
        
        setMember({
            ...member,
            [name]: value
        });

        if( id !== '' ){
            console.log('input');
            if ( name === 'id' ){
                axios.get('http://3.35.140.126:9000/user/duplicate_check?' + {id})
                .then(function(response){  
                    console.log(response.data.result);
                    if( response.data.result === 'success'){
                        //중복 있음
                        setValid('true');
                    }
                    else{
                        //중복 없음
                        setValid('false');
                    }
                })
                .catch(function(error){
                    alert(error);
                })
            }
        }
        
    }

    const submit = (ev:any) => {
        ev.preventDefault();
        // props.onCreate(this.state);
        
        if(!id || !pw || !name || !phone){ //전체 입력 확인
            alert('모든 값이 입력되지 않았습니다.');
        }
        else{
            if(pw !== pwCheck){ //비밀번호 입력 값 확인
                alert('비밀번호 확인이 필요합니다.');
            }
            else{
                axios.post('http://3.35.140.126:9000/apis/users/joins', member)
                .then(function (response) {
                    console.log(response);
                    alert('반갑습니다.');
                    setMember({
                        id: "",
                        pw: "",
                        pwCheck: "",
                        name: "",
                        phone: "",
                        profile: ""
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
        border: (valid === 'true') ? "2px solid lightseagreen" : (valid === 'false') ? "2px solid tomato" : "1px solid gray",
        color: (valid === 'true') ? "lightseagreen" : (valid === 'false') ? "tomato" : "black"
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
                            <Input placeholder="카카오계정" value={id} onChange={onChangeValue} name="id"></Input>
                            <Input placeholder="비밀번호" value={pw} onChange={onChangeValue} name="pw"></Input>
                            <Input placeholder="비밀번호 확인" value={pwCheck} onChange={onChangeValue} name="pwCheck"></Input>
                            {(passwordCheck === 'false' && <div style={checkStyle}>입력하신 비밀번호 확인 부탁드립니다.</div>)}
                            <Input placeholder="휴대폰 번호 (ex. 010-0000-0000)" value={phone} onChange={onChangeValue} name="phone"></Input>
                            <Input type="file" placeholder="프로필 사진" id="profile" name="profile"></Input>
                        </div>
                        <Button type="submit" onClick={submit}>회원가입</Button>
                    </div>
                </form>
            </main>
    );
}

export default SignUp;

const Input = styled.input`

    &:focus{
        outline: none;
    }
    width: 240px;
    height: 42px;
    border: 1px solid gray;
    padding-left: 7px;

    ${props => {
        return props.valid ? 'background: blue' : 'background: red'
    }}
`;

const Button = styled.button`
    width: 240px;
    height: 42px;
    border: 1px solid lightgray;
    background: #ececec;

    &:hover{
        cursor: pointer;
    }

    
`;

const Container = styled.div`
`;

const Logo = styled.div`
`;