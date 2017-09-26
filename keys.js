console.log('this is loaded');

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

var twitterKeys = new Twitter({
    consumer_key: 'MT6Kz9sgWOxCFQQrSRBSe8Zig',
    consumer_secret: '4OaW03C7hCm0mSsFiY7yRjtO7I06PVpKndM5HdzeDi1s5MoO6n',
    access_token_key: '912388687492612096-Txh15UDUud6pEHY9hZnXAqUz0XJZruH',
    access_token_secret: 'XC8lGdihmNR4m2Ds8oAMc5af7Q2E90ocb6lhWJ9EiJ3g9',
});

var spotify = new Spotify({
    id: '0b5e81971fea4ff3966c6b33b5c67995',
    secret: 'f7bf719e1ed940c3a9c33c40b03d1cb8'
});




module.exports = {
    twitterKeys,
    spotify
}