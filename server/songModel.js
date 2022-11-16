const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const songSchema = new Schema({
    title: String,
    artist: String,
    spotify_id: String,
    acousticness: String,
    danceability: String,
    energy: String,
    liveness: String,
    loudness: String,
    tempo: String,
    time_signature: String,
    url: String,

});


 
module.exports = mongoose.model("Song", songSchema);