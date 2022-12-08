const express = require('express') 
const router = express.Router() 
const User = require('../models/User')

router.post('/edit', async (req, res) => { 
    try { 
        console.log(req) 
        const updateData = { 
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email, 
            password: req.body.password 
        }
        await User.updateOne({ _id: req.body._id}, {$set: updateData})
        const user = await User.findOne({ _id: req.body._id})
        res.json({ 
            user: user, 
            success: true, 
        })
    } catch (err) { 
        res.sendStatus(400) 
        console.err(err) 
    }
})

module.exports = router 