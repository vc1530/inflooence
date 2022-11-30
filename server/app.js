// import express JS module into app
// and creates its variable.
const express = require('express');
const app = express();
const morgan = require('morgan');
const Song = require('./songModel.js')
const cors = require('cors')

// enable cors
app.use(cors())
const path = require('path') 

require("dotenv").config({ silent: true })

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

const login = require('./routes/login') 
app.use('/', login) 

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
app.get('/allsongs', async (req,res)=>{
 try { 
  const songs = await Song.find({}) 
  res.json({ 
    success: true, 
    songs: songs, 
  })
 } catch (err) { 
  console.error(err) 
  res.status(400).json({ 
    success: false, 
    error: err, 
  })
 }
})

//get a song by its id 
app.get('/:id', async (req, res) => { 
  try { 
    const song = await Song.findById(req.params.id) 
    res.json({ 
      song: song, 
    })
  } catch (err) { 
    res.status(400).json({ 
      error: err, 
    })
  }
})

module.exports = app;
