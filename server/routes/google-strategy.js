const GoogleStrategy = require('passport-google-oauth2').Strategy 
require("dotenv").config({ silent : true }) 

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
    callbackURL: `http://localhost/8888/oauth2/redirect/google`
}, { 
    function(request, accessToken, refreshToken, profile, done) {
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