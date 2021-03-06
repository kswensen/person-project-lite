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

// app.get('/api/getVideos', (req, res)=> {
//     request('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=sxRzGmYg_J8&key=' + config.apiKey, (error, response, body)=> {
//     if(videoCall.length === 0){
//         videoCall.push(response);    
//         res.status(200).send(response);
//     } else {
//         res.status(200).send(response);
//     }    
//     })
// })

app.get('/api/getVideoCall', (req, res)=> {
    res.status(200).send(videoCall);
})

app.post('/api/upload', (req, res)=> {
    request('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + req.body.url + '&key=' + config.apiKey, (error, response, body) => {
        videoCall.push(response);
        res.status(200).send(response);
    })
})

const port = 3042;
app.listen(port, ()=> {console.log(`Its lit fam on ${port}`)});