import React, { Component } from 'react';
import './Home.css';
import Login from './../login/Login';
import axios from 'axios';

class Home extends Component{
    constructor(){
        super();

        this.state = {
            logout: false,
            videos: [],
            toggled: false,
            url: ''
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
            console.log(JSON.parse(response.data.body).items);
            // this.setState({
            //     videos: response.data
            // });
            // console.log(this.state.videos)
        })
    }

    toggleUpload(){
        this.setState({
            toggled: true
        })
    }

    hideUpload(){
        this.setState({
            toggled: false,
            url: ''
        })
    }

    urlInput(input){
        var splitUrl = input.split(/.{31}(?=\=)/);
        var id = splitUrl[1].replace('=', '');
        this.setState({
            url: id
        })
    }

    upload(){
        
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
                    <img src='./uploadLogo.png' className="logo" onClick={()=> this.toggleUpload()}></img>
                       {
                           this.state.toggled 
                           ?
                        <div className="uploadBox">
                            <div className="close" onClick={()=> this.hideUpload()}>X</div>
                            <div className="uploadInfo">
                            <input placeholder="YouTube URL" className="uploadInput" onChange={(e)=> this.urlInput()}></input>
                            <button className="uploadButton"  onClick={()=> this.upload()}>Upload</button>
                            </div>
                        </div>
                        :
                        null
                       }
                    <img src='./logoutLogo.png' className="logo" onClick={()=> this.logOut()}></img>
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