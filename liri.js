const fs = require('fs');
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

var client = keys.twitterKeys;
var spotify = keys.spotify;

var command = process.argv[2];
var command2 = process.argv[3];

function spotifySong(song) {
    spotify
        .search({
            type: 'track', query: song, limit: 1
        })
        .then(function (response) {
            //console.log(JSON.stringify(response, undefined, 2));
            console.log(`Artist(s): ${response.tracks.items[0].album.artists[0].name}`);
            console.log(`Song's Name: ${response.tracks.items[0].name}`);
            console.log(`Preview Link: ${response.tracks.items[0].preview_url}`);
            console.log(`Album: ${response.tracks.items[0].album.name}`);
        })
        .catch(function (err) {
            console.log(err);
        });
}

if (command === 'my-tweets') {  
    var params = { screen_name: 'deeCodeMonkey', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++){
                console.log(`Tweet: ${tweets[i].text} || Posted: ${new Date(tweets[i].created_at).toLocaleString()}`);
            }
        }
    });

} else if (command === 'spotify-this-song') {
    if (command2 === '' || command2 === undefined) {
        command2 = 'ace of base'
    }
    spotifySong(command2);

} else if (command === 'movie-this') {
    console.log('3');
} else if (command === 'do-what-it-says') {
    console.log('4');
} else {
    console.log('5');
}


