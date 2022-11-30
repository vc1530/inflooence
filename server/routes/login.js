const express = require('express') 
const router = express.Router() 
const User = require('../models/User')
const jwt = require("jsonwebtoken")

const { jwtOptions, jwtStrategy } = require("./jwt-config.js") 
const passport = require("passport")
router.use(passport.initialize())
passport.use('jwt', jwtStrategy)

//creating a jwt to send to front end 
router.post('/login', async (req, res) => { 
    const user = await User.findOne({email: req.body.email})
    const token = jwt.sign({id: user._id}, jwtOptions.secretOrKey) 
    res.json({ 
        success: true, 
        token: token, 
        id: user._id, 
    })
})

//authenticating jwt and sending back user information 
router.get('/user', passport.authenticate('jwt', {session: false}), async (req, res) => { 
    res.json({ 
        success: true, 
        user: req.user
    })
})

module.exports = router; 