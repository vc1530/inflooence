const express = require('express') 
const router = express.Router() 
const User = require('../models/User')

router.post('/signup', async (req,res) => { 
    const user = new User({ 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        password: req.body.password, 
    })
    user.save() 
    res.json({ 
        success: true, 
        user: user, 
    })
})

module.exports = router 