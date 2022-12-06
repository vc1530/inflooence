const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({ 
    firstName: { 
        required: true, 
        type: String, 
    }, 
    lastName: { 
        required: true, 
        type: String, 
    }, 
    email: { 
        required: true, 
        type: String, 
    }, 
    password: { 
        required: true, 
        type: String, 
    },
    savedSongs: {
        type: [String],
    }
})

const User = mongoose.model('User', userSchema) 

module.exports = User