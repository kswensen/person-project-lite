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

    // componentDidMount(){
    //     return axios.get('/api/getVideoCall').then(response => {
    //         this.setState({
    //             videos: response.data
    //         })
    //     })
    // }

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
        this.setState({
            url: input
        })
    }

    urlSplit(input){
        var splitUrl = input.split(/.{31}(?=\=)/);
        var id = splitUrl[1].replace('=', '');
        return id;

        //https://www.youtube.com/watch?v=mzX1ws0SLGk
    }

    upload(){
        let url = this.urlSplit(this.state.url);
        let urlId = {
            url: url
        }
        axios.post('/api/upload', urlId).then(response =>{
            console.log(JSON.parse(response.data.body).items)
            if(this.state.videos === null){
                this.setState({
                    videos: JSON.parse(response.data.body).items,
                    toggled: false
                })
            } else {
            this.setState({
                videos: [...this.state.videos, JSON.parse(response.data.body).items],
                toggled: false
            })
        }
        })
    }

    logOut(){
        this.setState({
            logout: true
        })
    }
    
    render(){
        if(!this.state.logout){
            var videos = [];
            {
                this.state.videos.length < 1
                ?
                null
                :
                videos = this.state.videos.map((nested)=>{
                    console.log("nested", nested)
                return nested.map((video, i)=> {
                    console.log("video: ", video.snippet.title)
                const url = 'https://www.youtube.com/watch?v=' + video.id;
                return (<ul key={i} className="video">
                    <a target='_blank' href={url}><img src={video.snippet.thumbnails.maxres.url}/></a>
                    <a target='_blank' href={url}><p>{video.snippet.title}</p></a>
                </ul>)
            })
            })
            console.log("videos array: ", videos)
            }
        return(
            <div>
                <div className="background">
                <div className="mainScreen">
                <header className="header">
                    <div className="logoContainer">
                    <img src='./uploadLogo.png' className="logo" onClick={()=> this.toggleUpload()}></img>
                    <img src='./logoutLogo.png' className="logo" onClick={()=> this.logOut()}></img>
                       {
                           this.state.toggled 
                           ?
                        <div className="uploadBox">
                            <div className="close" onClick={()=> this.hideUpload()}>X</div>
                            <div className="uploadInfo">
                            <input placeholder="YouTube URL" className="uploadInput" onChange={(e)=> this.urlInput(e.target.value)}></input>
                            <button className="uploadButton"  onClick={()=> this.upload()}>Upload</button>
                            </div>
                        </div>
                        :
                        null
                       }
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