import React, { Component } from 'react';
import styles from './SignUp.css';

class SignUp extends Component {

    state = {
        "id": "",
        "pw": "",
        "name": "",
        "phone": "",
        "img": ""
    };
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    
    handleSubmit = (e) => {
        e.preventDefault(); //페이지 리로딩 방지 
        this.props.onCreate(this.state); //상태 값을 onCreate를 통하여 부모에게 전달
        this.setState({
            "id": "",
            "pw": "",
            "name": "",
            "phone": "",
            "img": ""
        }); //초기화
    }

    render(){
        return(
            <form className={styles.form} onSubmit={this.handleSubmit}>
                <div className={styles.inner}>
                    <img className={styles.logo} src=""/>
                    <div className={styles.container}>
                    <input
                        className={styles.box}
                        placeholder="ID"
                        value={this.state.id}
                        onChange={this.handleChange}
                        name="id">
                    </input>
                    <input
                        className={styles.box}
                        placeholder="Password"
                        value={this.state.pw}
                        onChange={this.handleChange}
                        name="pw">
                    </input>
                    <input
                        className={styles.box}
                        placeholder="PasswordCheck"
                        name="pwCheck">
                    </input>
                    <input
                        className={styles.box}
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name">
                    </input>
                    <input
                        className={styles.box}
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        name="phone">
                    </input>
                    <input
                        className={styles.box}
                        placeholder="img"
                        value={this.state.img}
                        onChange={this.handleChange}
                        name="img">
                    </input>
                    </div>
                    <button className={styles.btn} type="submit">sign up</button>
                </div>
            </form>
        );
    }
}

export default SignUp;