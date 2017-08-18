const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logins = require('./data/logins');
const videos = require('./data/videos');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res)=> {
    if(req.body.username === logins.username && req.body.password === logins.password){
        res.status(200).send("ok");
    } else {
        res.status(404).send("Invalid");
    }
})

app.get('/api/getVideos', (req, res)=> {
    res.status(200).send(videos.videos);
})

const port = 3041;
app.listen(port, ()=> {console.log(`Its lit fam on ${port}`)});