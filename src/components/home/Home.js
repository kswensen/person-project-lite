import React, { Component } from 'react';
import './Home.css';
import Login from './../login/Login';
import axios from 'axios';

class Home extends Component{
    constructor(){
        super();

        this.state = {
            logout: false,
            videos: []
        }
    }

    componentDidMount(){
        return axios.get('/api/getVideos').then(response => {
            this.setState({
                videos: response.data.body
            })
            console.log(this.state.videos)
        })
    }

    logOut(){
        this.setState({
            logout: true
        })
    }
    
    render(){
        if(!this.state.logout){
        return(
            <div>
                <div className="mainScreen">
                <header className="header">
                    <div className="logoContainer">
                    <img src='./logoutIcon.png' className="logo" onClick={()=> this.logOut()}></img>
                    </div>
                </header>
                </div>
            </div>
        )} else {return <Login />}
    }
}
export default Home;