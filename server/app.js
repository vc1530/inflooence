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
const PORT = process.env.PORT || 8888

require("dotenv").config({ silent: true })

app.listen(PORT, function() {
    console.log('server running on port 8888 / render');
} )
app.use(express.json());

// const { spawn } = require('node:child_process');
const { spawn } = require('child_process');

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
app.get('/allsongs', async (req,res)=>{
  console.log("hello")
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

// apparently needed to be hosted
app.get('/', (req, res) => {
  res.sendStatus(200)
})


//this is me trying to implement login 
//just for funsies 
// - vanessa 
// const Users = [ 
//   { 
//       id: 1, 
//       email: "inflooence.testing@gmail.com", 
//       password: "inflooence.testing", 
//   }
// ]

// const jwt = require("jsonwebtoken")

//creating a jwt to send back to front end 
// app.post('/login', (req, res) => { 
//   console.log(req.body);
//   const user = Users.find(user => 
//     user.email == req.body.email && user.password == req.body.password
//   )
//   const token = jwt.sign({id: user.id}, jwtOptions.secretOrKey) 
//   res.json({ 
//     success: true, 
//     token: token, 
//     id: user.id, 
//   })
// })

//IGNORE THIS FOR NOW... 
//i was trying to implement google login but it is not working haha 
// const passport = require("passport")
// app.use(passport.initialize())

// const { jwtOptions, jwtStrategy } = require("./jwt-config.js") 
// passport.use(jwtStrategy)

// const passport_jwt = passport.authenticate('jwt', { session: false }) 
// app.use(passport_jwt)

// require('./google-strategy.js') 
// const passport_google = passport.authenticate( 'google', {
//   successRedirect: '/auth/google/success',
//   failureRedirect: '/auth/google/failure', 
//   session: false, 
// })
// app.use(passport_google) 

// //this is the part that doesn't work lol 
// app.get('/user', (req, res) => { 
//   console.log(req.user) 
//   res.json({ 
//     success: true, 
//     user: req.user, 
//   })
// })

// app.get('/oauth2/redirect/google',
//   passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
//   function(req, res) {
//     res.redirect('/');
//   });

module.exports = app;
