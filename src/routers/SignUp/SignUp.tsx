import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './SignUp.css';
import Api from './../Api';

const SignUp = ({history}:any) =>{
    const [member, setMember] = useState({
        id: "",
        pw: "",
        pwCheck: "",
        nickName: "",
        phone: "",
        profile: ""
    });

    const [valid, setValid] = useState("");
    const [passwordCheck, setPasswordCheck] = useState('');

    const { id, pw, pwCheck, nickName, phone, profile } = member;

    const onChangeValue = (e:any) => {
        const { value, name } = e.target;

        if(name == 'file'){
            var formData = new FormData();
            formData.append('attachedImage', value);
            //바이너리 함수 호출
            //결과 값을 벨류에 담음.

        }
        

        setMember({
            ...member,
            [name]: value
        });

        // if( id !== '' ){
        //     if ( name === 'id' ){
        //         console.log(valid);
        //         Api({apiname : 'duplicateCheck' , params : id})
        //         .then(function(response){  
        //             if(response.data === 'success'){ 
        //                 //중복없음 사용가능
        //                 setValid("true");
        //             }
        //             else{
        //                 //중복, 사용불가
        //                 setValid("false");
        //             }
        //         })
        //         .catch(function(error){
        //             alert(error);
        //         })
        //     }
        // }

        
        
    }

    const submit = (ev:any) => {
        ev.preventDefault();
        // props.onCreate(this.state);
        
        if(!id || !pw || !nickName || !phone){
            alert('모든 값이 입력되지 않았습니다.');
        }
        else{
            console.log(member);
            if(pw !== pwCheck){
                alert('비밀번호 확인이 필요합니다.');
            }
            else{
                Api({apiname : 'join' , params : member})
                .then(function (response) {
                    alert('반갑습니다.');
                    setMember({
                        id: "",
                        pw: "",
                        pwCheck: "",
                        nickName: "",
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

    const fileUpload = (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        setMember({
            ...member,
            profile: file
        });
    }

    const fileSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('profile', files[0].uploadFile);
        
    }

    return(
        <Container>
                <form className="form">
                    <Inner>
                        <div className="logoContainer">
                            <div className='logo' />
                        </div>
                        <div className="container">
                            <Input placeholder="카카오계정" value={id} onChange={onChangeValue} name="id"></Input>
                            <Input type="password" placeholder="비밀번호" value={pw} onChange={onChangeValue} name="pw"></Input>
                            <Input type="password" placeholder="비밀번호 확인" value={pwCheck} onChange={onChangeValue} name="pwCheck"></Input>
                            <Input placeholder="닉네임" value={nickName} onChange={onChangeValue} name="nickName"></Input>
                            {/* {(passwordCheck === 'false' && <div style={checkStyle}>입력하신 비밀번호 확인 부탁드립니다.</div>)} */}
                            <Input placeholder="휴대폰 번호 (ex. 010-0000-0000)" value={phone} onChange={onChangeValue} name="phone"></Input>
                            <form name='profile' encType='multipart/form-data' onSubmit={fileSubmit}></form>
                            <input type="file" onChange={fileUpload} id="profile" name="profile"></input>
                        </div>
                        <Button type="submit" onClick={submit}>회원가입</Button>
                    </Inner>
                </form>
            </Container>
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

`;

//위에 들어가야함
// ${props => {
//     return props.valid ? 'background: blue' : 'background: red'
// }}

// const divStyle = {
//     color: 'blue',
//     fontSize: '12px'
// };

// const changeBoxColor = {
//     border: (valid === 'true') ? "2px solid lightseagreen" : (valid === 'false') ? "2px solid tomato" : "1px solid gray",
//     color: (valid === 'true') ? "lightseagreen" : (valid === 'false') ? "tomato" : "black"
// };

// const checkStyle = {
//     color: 'red',
//     fontSize: '12px'
// }

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
    width: 340px;
    height: 640px;
    margin: 20px auto;
    background-color: #FFEB33;
`;

const Inner = styled.div`
    width: 240px;
    margin: 0 auto;
    padding-top: 70px;
`;
