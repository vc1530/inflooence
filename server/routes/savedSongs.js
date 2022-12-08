const express = require('express') 
const router = express.Router() 
const User = require('../models/User')
const Song = require('../songModel')
const ObjectId = require('mongodb').ObjectId

const { jwtStrategy } = require("./jwt-config.js") 
const passport = require("passport")
router.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// allow user to save a song name under his account
router.get('/savesong/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
      await User.updateOne({ _id: req.user._id }, { $addToSet: { savedSongs: req.params.id } })
      const user = await User.findOne({ _id: req.user._id }) 
      console.log(user) 
      res.json( {
        savedSongs: user.savedSongs, 
        success: true, 
      }); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  
router.get('/removesong/:id', passport.authenticate('jwt', {session: false}), async(req, res) => { 
    try { 
        await User.updateOne({ _id: req.user._id }, { $pull: { savedSongs: req.params.id } });
        const user = await User.findOne({ _id: req.user._id })
        res.json({
            savedSongs: user.savedSongs, 
            success: true, 
        }); 
    } catch (err) { 
        res.status(500).json({ error: err.message });
    }
})
// allow user to save a song name under his account
// this returns list of ID of user saved songs 
router.get('/allsavedsongs', passport.authenticate('jwt', {session: false}), async (req,res)=>{
  try { 
    res.json({ 
      saved_songs: req.user.savedSongs, 
      success: true, 
    })
  } catch (err) { 
    console.error(err) 
    res.status(400).json({ 
      success: false, 
      error: err, 
    })
  }
})

module.exports = router 