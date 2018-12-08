require("dotenv").config();

var fs = require("fs");
var moment = require("moment");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var axios = require("axios");
var movieThis = process.argv[2];
var search = process.argv[3];

if (movieThis === "movie-this" && process.argv.length === 3) {
    axios.get("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log(response.data);
        })
}


else if (movieThis === "movie-this") {
    movieThisFunc();
}


var concertThis = process.argv[2];
var artist = process.argv[3];


if (concertThis === "concert-this") {
   
    concertThisFunc();
}

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
var operAnd = process.argv[2]
// var songType = process.argv[3]
var songName = process.argv[3]
if (operAnd === "spotify-this-song" && process.argv.length === 3) {
    console.log(spotify.search({ type: "track", query: "Ace Of Base" }, function (err, data) {


        console.log("\r");
        console.log("Artist's name: " + (data.tracks.items[0].artists[0].name));
        console.log("\r");
        console.log("Track Name: " + (data.tracks.items[0].name));
        console.log("\r");
        console.log("Short Clip: " + (data.tracks.items[0].preview_url));
        console.log("\r");
        console.log("Name of Album: " + (data.tracks.items[0].album.name));
        // console.log(data.tracks.items[0].artists[0]);
        // console.log(data.tracks.items[0]);

    }))

}
else if (operAnd === "spotify-this-song") {

    spotifyThisSong();
}

function movieThisFunc(passedMovie){
    var search = "";
    for (var i = 3; i < process.argv.length; i++) {
        search += process.argv[i] + " ";
    }
    if (passedMovie){
        search= passedMovie;
    }

        axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                // console.log(response.data);
                console.log("\r")
                console.log("The title of the movie is:");
                console.log(response.data.Title);
                console.log("The year of the movie is:");
                console.log(response.data.Year);
                console.log("The imdb rating of the movie is:");
                console.log(response.data.imdbRating);
                console.log("The rotten-tomatoe of the movie is:");
                console.log(response.data.Ratings[1].Value);
                console.log("The country of the movie is:");
                console.log(response.data.Country);
                console.log("The language of the movie is:");
                console.log(response.data.Language);
                console.log("The plot of the movie is:");
                console.log(response.data.Plot);
                console.log("The actors of the movie is:");
                console.log(response.data.Actors);

            })
    
}

function concertThisFunc(passedArtist){
    var artist = "";
    for (var i = 3; i < process.argv.length; i++) {
        artist += process.argv[i] + "";
    }
    if (passedArtist){
        artist= passedArtist;
    }
    console.log(artist);
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
            .then(function (response) {
                // console.log(response.data);
                console.log(response.data[0].venue.name);
                console.log(response.data[0].venue.city);
                var date = moment(response.data[0].datetime);
                var formattedDate = date.format("L");
                console.log(formattedDate);
            })
    
}

function spotifyThisSong(song) {
    var songName = "";

    for (var i = 3; i < process.argv.length; i++) {
        songName += process.argv[i] + "";
    }
    if (song){
        songName = song;
    }
    spotify.search({ type: "track", query: songName }, function (err, data) {


        console.log("\r");
        console.log("Artist's name: " + (data.tracks.items[0].artists[0].name));
        console.log("\r");
        console.log("Track Name: " + (data.tracks.items[0].name));
        console.log("\r");
        console.log("Short Clip: " + (data.tracks.items[0].preview_url));
        console.log("\r");
        console.log("Name of Album: " + (data.tracks.items[0].album.name));;

    });

}


var doThis = process.argv[2];

if (doThis === "do-what-it-says") {


    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) {
            console.log("error");
        }
        // console.log(data);
        var dataArr = data.split(", ");
        console.log(dataArr[0]);

        if(dataArr[0] === "spotify-this-song"){
            spotifyThisSong(dataArr[1]);
        } else if (dataArr[0] === "concert-this"){
            concertThisFunc(dataArr[1]);
        } else if (dataArr[0] === "movie-this"){
            movieThisFunc(dataArr[1]);
        }


    })
}






//   spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data.name); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });
