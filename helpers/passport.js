const User = require('../models/user'),
    FacebookStrategy = require('passport-facebook').Strategy,
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    config = require('../config/config');

module.exports = function (passport) {

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID		: config.facebook.id,
        clientSecret	: config.facebook.secret,
        callbackURL	    : '/auth/facebook/callback',
        profileFields   : ['id', 'name', 'displayName', 'emails', 'photos']
    }, function(accessToken, refreshToken, profile, done) {
        User.findOne({email: profile.emails[0].value}, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null) return done(null, user);
            let newUser = new User({
                email   	: profile.emails[0].value,
                username  : profile.displayName,
                firstName	: profile.name.givenName,
                lastName  : profile.name.familyName,
                avatar		: profile.photos[0].value
            });
            console.log(newUser);
            newUser.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};