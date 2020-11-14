import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = ({history}) =>{
    const [member, setMember] = useState({
        id: "",
        pw: "",
        name: "",
        phone: "",
        img: ""
    });

    const { id, pw, name, phone, img } = member;

    const onChangeValue = (e) => {
        console.log('handleChange');
        
        const { value, name } = e.target;
        
        setMember({
            ...member,
            [name]: value
        });
        console.log(id);
        if ( name === id ){ //아이디 값 중복 체크
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

        //전체 입력 되었는지 
        if(!id | !pw | !name | !phone){
            alert('모든 값이 입력되지 않았습니다.');
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

    const goLogin = () => {
        history.push('/login');
    }

    return(
        <main className="signup" >
                <form className="form">
                    <div className="inner">
                        <img className="logo"/>
                        <div className="container">
                        <input
                            className="box"
                            placeholder=" ID"
                            value={id}
                            onChange={onChangeValue}
                            name="id">
                        </input>
                        <input
                            className="box"
                            placeholder=" Password"
                            value={pw}
                            onChange={onChangeValue}
                            name="pw">
                        </input>
                        <input
                            className="box"
                            placeholder=" PasswordCheck"
                            name="pwCheck">
                        </input>
                        <input
                            className="box"
                            placeholder=" name"
                            value={name}
                            onChange={onChangeValue}
                            name="name">
                        </input>
                        <input
                            className="box"
                            placeholder=" phone"
                            value={phone}
                            onChange={onChangeValue}
                            name="phone">
                        </input>
                        <input
                            className="box"
                            placeholder=" img"
                            value={img}
                            onChange={onChangeValue}
                            name="img">
                        </input>
                        </div>
                        <button className="btn" type="submit" onClick={submit}>sign up</button>
                    </div>
                </form>
            </main>
    );
}

export default SignUp;