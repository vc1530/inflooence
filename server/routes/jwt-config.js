const path = require('path') 
require("dotenv").config({ silent : true }) 
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const User = require('../models/User')

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT") 
jwtOptions.secretOrKey = process.env.JWT_SECRET

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => { 
    const user = await User.findOne({_id: jwt_payload.id})
    if (user) { 
        return done(null, user) 
    } else {
        return done(null, false) 
    } 
})

module.exports = {
  jwtOptions, 
  jwtStrategy,
}