import React, { useState } from 'react';
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

    const onChangeValue = (ev) => {
        console.log('handleChange');
        const { value, name } = ev.target;
        setMember({
            ...member,
            [name]: value
        });

    }

    const submit = (ev) => {
        console.log('submit');
        console.log(member);
        ev.preventDefault();
        // props.onCreate(this.sstate);
        setMember({
            id: "",
            pw: "",
            name: "",
            phone: "",
            img: ""
        });
        goLogin();
    }

    const goLogin = () => {
        history.push('/login');
    }

    return(
        <main className="signup" >
                <form className="form">
                    <div className="inner">
                        <img className="logo" src=""/>
                        <div className="container">
                        <input
                            className="box"
                            placeholder="ID"
                            value={id}
                            onChange={onChangeValue}
                            name="id">
                        </input>
                        <input
                            className="box"
                            placeholder="Password"
                            value={pw}
                            onChange={onChangeValue}
                            name="pw">
                        </input>
                        <input
                            className="box"
                            placeholder="PasswordCheck"
                            name="pwCheck">
                        </input>
                        <input
                            className="box"
                            placeholder="name"
                            value={name}
                            onChange={onChangeValue}
                            name="name">
                        </input>
                        <input
                            className="box"
                            placeholder="phone"
                            value={phone}
                            onChange={onChangeValue}
                            name="phone">
                        </input>
                        <input
                            className="box"
                            placeholder="img"
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