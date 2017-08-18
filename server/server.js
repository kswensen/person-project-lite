const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logins = require('./data/logins');
const videos = require('./data/videos');
const config = require('./config');
const request = require('request');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const videoCall = [];

app.post('/login', (req, res)=> {
    if(req.body.username === logins.username && req.body.password === logins.password){
        res.status(200).send("ok");
    } else {
        res.status(404).send("Invalid");
    }
})

app.get('/api/getVideos', (req, res)=> {
    request('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=' + config.apiKey, (error, response, body)=> {
        res.status(200).send(response);
        videoCall.push(response);
    })
})

app.get('/api/getVideoCall', (req, res)=> {
    res.status(200).send(videoCall);
})


const port = 3041;
app.listen(port, ()=> {console.log(`Its lit fam on ${port}`)});