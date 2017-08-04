
var fs      = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var key     = require("./keys.js");
var operation = process.argv[2];
// Twitter API
  if (operation === "my-tweets") {
  var client = new Twitter(key.twitterKeys);
  var params = {screen_name: 'chaudhrymamoona'};

  // getting all of my tweets in the sequence from most recent to older 
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      console.log(error);
  };
      for (var i=0; i < tweets.length; i++) {
      console.log(`Tweet Time:     `+tweets[i].created_at);
      console.log(`\nMy Tweet:     `+ tweets[i].text);
      };
  });
};
// OMDb API Movie Database
if (operation === "movie-this") {
  var argument = process.argv;
  var argvArray = [];
      for (var i=3; i < argument.length; i++) {
        argvArray.push(argument[i]);
        var title = argvArray.join("+");
      }
  if (title !== undefined) {
    
    request(`http://www.omdbapi.com/?t=${title}&y=&plot=short&apikey=40e9cece`, function(error, response, body) {
    
    if (!error && response.statusCode === 200) {
      console.log("Title:                     " + JSON.parse(body).Title);
      console.log("Language:                  " + JSON.parse(body).Language);
      console.log("Year:                      " + JSON.parse(body).Year);
      console.log("Country:                   " + JSON.parse(body).Country);
      console.log("IMDB Rating rating:        " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating:    " + JSON.parse(body).Ratings[1].Value);
      console.log("Actors:                    " + JSON.parse(body).Actors);
      console.log("Plot:                      " + JSON.parse(body).Plot);
      }
    });
  } else {
    request(`http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=40e9cece`, function(error, response, body) {
    
    if (!error && response.statusCode === 200) {
      console.log("Title:                     " + JSON.parse(body).Title);
      console.log("Language:                  " + JSON.parse(body).Language);
      console.log("Year:                      " + JSON.parse(body).Year);
      console.log("Country:                   " + JSON.parse(body).Country);
      console.log("IMDB Rating:               " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating:    " + JSON.parse(body).Ratings[1].Value);
      console.log("Actors:                    " + JSON.parse(body).Actors);
      console.log("Plot:                      " + JSON.parse(body).Plot);
      }
    });
  }
};
// Node-Spotify-API
if (operation === "spotify-this-song") {
  
  var spotify = new Spotify(key.spotifyKeys);
var argument = process.argv;
var argvArray = [];
for (var i=3; i < argument.length; i++) {
        argvArray.push(argument[i]);
        var song = argvArray.join("+");
      }
if (song !== undefined) {
 
spotify.search({ type: 'track', query: song }, function(err, data) {
    
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  console.log("Artist(s):                 " + data.tracks.items[0].artists[0].name);
  console.log("The song's name:           " + data.tracks.items[0].name);
  console.log("The album's name:          " + data.tracks.items[0].album.name);
  console.log("link of the song:          " + data.tracks.items[0].external_urls.spotify);
    });
  } else {
    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
    
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  console.log("Artist(s):                 " + data.tracks.items[0].artists[0].name);
  console.log("The song's name:           " + data.tracks.items[0].name);
  console.log("The album's name:          " + data.tracks.items[0].album.name);
  console.log("link of the song:          " + data.tracks.items[0].external_urls.spotify);
    });
  }
};
// do-what-it-says
if (operation === "do-what-it-says") {
  
    fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    
    var argvArray = data.split(",");
    var command = argvArray.join(" ");
    console.log(data);
    console.log(argvArray);
    console.log(command);
  });
}