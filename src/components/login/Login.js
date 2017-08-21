import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Home from './../home/Home';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loggedIn: false
        }
    }

    updateUsername(enteredUsername) {
        this.setState({
            username: enteredUsername
        })
    }

    updatePassword(enteredPassword) {
        this.setState({
            password: enteredPassword
        })
    }

    submit() {
        let login = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('/login', login).then(response => {
            var loginStatus;
            if (response.status == 200) {
                loginStatus = true;
            }
            this.setState({
                loggedIn: loginStatus
            })
        })
    }

    render() {
        if(!this.state.loggedIn){
        return (
            <div>
                <div className="loginBoxContainer">
                    <div className="loginBox">
                    <div className="circleLogo"></div>
                        <div className="usernameContainer">
                            <div className="username">
                                <input placeholder="Username" onChange={(e) => this.updateUsername(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="passwordContainer">
                            <div className="password">
                                <input placeholder="Password" className="passwordInput" type="password" onChange={(e) => this.updatePassword(e.target.value)}></input>
                            </div>
                        </div>
                        <button className="loginButton" onClick={() => this.submit()}>Submit</button>
                    </div>
                </div>
            </div>
        )} else { return <Home />}
    }
}
export default Login;