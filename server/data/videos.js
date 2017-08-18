const request = require('request-promise');
const config = require('./../config');

module.exports = {
    videos: ["hello"],
    youtubeCall: ()=> {
        request.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=' + config.apiKey).then(response=> {
            console.log(response);
        })
    }
}