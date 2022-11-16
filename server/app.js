// import express JS module into app
// and creates its variable.
const express = require('express');
const app = express();
const morgan = require('morgan');
const Song = require('./songModel.js')

// Creates a server which runs on port 3000 and
// can be accessed through localhost:3000
app.listen(8888, function() {
    console.log('server running on port 8888');
} )
app.use(express.json());

const { spawn } = require('node:child_process');
const childPython = spawn('python3', ['main.py']);

childPython.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});


const mongoose = require("mongoose");
//configure mongoose
mongoose.connect(
  "mongodb+srv://INFLOOENCE:INFLOOENCE@inflooence.wode3u7.mongodb.net/inflooence?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

// middleware
app.use(morgan('dev'))
app.use(express.static('public')) 

// const songRouter = require("./routes");
// app.use("/api/songs", songRouter);



app.get('/add_test_song', (req, res)=>{
  const song = new Song({
    title: "testing",
    artist: "String",
    spotify_id: "String",
    acousticness: "String",
    danceability: "String",
    energy: "String",
    liveness: "String",
    loudness: "String",
    tempo: "String",
    time_signature: "String",
    url: "String",  
  });

    song.save()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
    })
})

// getter
app.get('/allsongs', (req,res)=>{
  Song.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((err) =>{
    console.log(err)
  })


})

module.exports = app;
