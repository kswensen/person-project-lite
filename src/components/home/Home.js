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
            console.log(response.data[0])
            this.setState({
                videos: response.data[0]
            })
            console.log("videos: ", this.state.videos)
        })
    }

    // getVideoCall(){
    //     return axios.get('/api/getVideoCall').then(response => { 
    //         console.log(response.data[0].body);
    //         this.setState({
    //             videos: response.data
    //         });
    //         console.log(this.state.videos)
    //     })
    // }

    logOut(){
        this.setState({
            logout: true
        })
    }
    
    render(){
        if(!this.state.logout){
            const videos = this.state.videos.map((video, i)=> {
                return (<ul key={i} className="video">
                    <img src={video.thumbnail}/>
                    <h3>{video.title}</h3>
                </ul>)
            })
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