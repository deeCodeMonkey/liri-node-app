    const fs = require('fs');
    const keys = require('./keys.js');
    const Twitter = require('twitter');
    const Spotify = require('node-spotify-api');
    const request = require('request');

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

    function findMovie(movie) {
        request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movie, function (error, response, body) {
            //console.log('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //console.log('body:', body); // Print the HTML for the Google homepage.
            body = JSON.parse(body);
            console.log(`Movie Title: ${body.Title} \nYear: ${body.Year} \nIMDB Rating: ${body.Rated} \nRotten Tomatoes Rating: ${body.Ratings[1].Value} \nCountry: ${body.Country} \nLanguage: ${body.Language} \nPlot: ${body.Plot} \nActors: ${body.Actors}`);
        });

    };

    var processCommand = function (command, command2) {

        if (command === 'my-tweets') {
            var params = { screen_name: 'deeCodeMonkey', count: 20 };
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    for (i = 0; i < tweets.length; i++) {
                        console.log(`Tweet: ${tweets[i].text} || Posted: ${new Date(tweets[i].created_at).toLocaleString()}`);
                    }
                }
            });

        } else if (command === 'spotify-this-song') {
            if (!command2) {
                command2 = 'ace of base'
            }
            spotifySong(command2);

        } else if (command === 'movie-this') {
            if (!command2) {
                command2 = 'Mr. Nobody'
                findMovie(command2);
            }
            findMovie(command2);

        } else if (command === 'do-what-it-says') {
            
            var toDo = fs.readFileSync('random.txt').toString().split(',');
            command = toDo[0];
            if (command === 'do-what-it-says') {
                console.log('Endless recursive command found!');
            } else {
                command2 = toDo[1].replace('"', '');
                processCommand(command, command2);
            }
        }
    }

    processCommand(command, command2);



