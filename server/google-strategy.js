const GoogleStrategy = require('passport-google-oauth2').Strategy 
require("dotenv").config({ path: 'server/.env' }) 

const Users = [ 
    { 
        id: 1, 
        email: "inflooence.testing@gmail.com", 
        password: "inflooence.testing", 
    }
]

const googleStrategy = new GoogleStrategy({ 
    clientID: process.env.googleClientID, 
    clientSecret: process.env.googleClientSecret,
    callbackURL: `http://localhost/8888/auth/google/callback`
}, { 
    function(request, accessToken, refreshToken, profile, done) {
        console.log(Users) 
        const user = Users.find(user => user.id == profile.id)
        if (user) { 
            return done(null, user) 
        } else {
            return done(null, false) 
        } 
    }
})

module.exports = { 
    googleStrategy 
}; 