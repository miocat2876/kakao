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
    });

    const { id, pw, pwCheck, name, phone, img } = member;

    const onChangeValue = (e) => {
        console.log('handleChange');
        
        const { value, name } = e.target;
        
        setMember({
            ...member,
            [name]: value
        });
        console.log(id);

        if ( name === 'id' ){ //아이디 값 중복 체크
            console.log('ajax');
            axios.post('http://3.35.140.126:9000/user/duplicate_check',
             id
            )
            .then(function(response){  
                alert('사용 가능한 아이디입니다.');
            })
            .catch(function(error){
                console.log('error');
                alert('이미 사용중인 아이디입니다.');
            })
        }
    }

    const submit = (ev) => {
        console.log('submit');
        console.log(member);
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

    return(
        <main className="signup" >
                <form className="form">
                    <div className="inner">
                        <div className="logoContainer">
                            <img src={kakaoLogo}/>
                        </div>
                        <div className="container">
                        <input
                            className="box"
                            placeholder="아이디"
                            value={id}
                            onChange={onChangeValue}
                            name="id">
                        </input>
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
                        <div className="imgConatiner">
                            <input
                                className="imgFile"
                                placeholder="프로필 사진"
                                value={img}
                                onChange={onChangeValue}
                                name="img">
                            </input>
                            {/* <input 
                                className="imgFile"
                                type="file"
                                value="file upload"
                                name="file">
                            </input> */}
                            <div className="imgFileBtn">파일</div>
                        </div>
                        
                        </div>
                        <button className="btn" type="submit" onClick={submit}>sign up</button>
                    </div>
                </form>
            </main>
    );
}

export default SignUp;