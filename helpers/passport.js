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
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID		: config.facebook.id,
        clientSecret	: config.facebook.secret,
        callbackURL	    : '/auth/facebook/callback',
        profileFields   : ['id', 'name', 'displayName', 'emails', 'picture.type(large)']
    }, function(accessToken, refreshToken, profile, done) {
        User.findOne({email: profile.emails[0].value}, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null) {
                user.set({lastLogin: user.nextLastLogin});
                user.set({nextLastLogin: Date.now()});
                user.set({tokenFb: accessToken});
                user.save();
                return done(null, user);
            }
            let newUser = new User({
                email   	: profile.emails[0].value,
                username  : profile.name.givenName,
                firstName	: profile.name.familyName,
                lastName  : profile.name.middleName,
                avatar		: profile.photos[0].value,
                tokenFb   : accessToken
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