const passport = require('passport');
const passport_jwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt ;
const User = require('../model/user');

let opts ={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'VYjHy6XJSQ'
}
passport.use('user',new passport_jwtStrategy(opts,function(payload,done){
    User.findById(payload._id)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        console.error('Error in passport strategy:', err);
        return done(err, false);
      });
 
})) ;
