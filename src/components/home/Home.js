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
                videos: JSON.parse(response.data.body).items
            })
        })
    }

    getVideoCall(){
        return axios.get('/api/getVideoCall').then(response => { 
            console.log(JSON.parse(response.data.boyd).items);
            // this.setState({
            //     videos: response.data
            // });
            // console.log(this.state.videos)
        })
    }

    logOut(){
        this.setState({
            logout: true
        })
    }
    
    render(){
        if(!this.state.logout){
            const videos = this.state.videos.map((video, i)=> {
                const url = 'https://www.youtube.com/watch?v=' + video.id;
                return (<ul key={i} className="video">
                    <a target='_blank' href={url}><img src={video.snippet.thumbnails.maxres.url}/></a>
                    <a target='_blank' href={url}><p>{video.snippet.title}</p></a>
                </ul>)
            })
        return(
            <div>
                <div className="background">
                <div className="mainScreen">
                <header className="header">
                    <div className="logoContainer">
                    <img src='./logoutIcon.png' className="logo" onClick={()=> this.logOut()}></img>
                    </div>
                </header>
                {videos}
                </div>
                </div>
            </div>
        )} else {return <Login />}
    }
}
export default Home;