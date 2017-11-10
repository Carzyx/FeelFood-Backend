'use strict';
const mongoose = require('mongoose'),
bcrypt = require('bcrypt-nodejs'),
Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        lowercase: true,
        required:true,
        unique:true
    },
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    },
    firstName: String,
    lastName: String,
    locations: [{
        locationName: { type: String },
        address: { type: String },
        postalCode: { type: Number },
        country: { type: String },
        city: { type: String }
    }],
    allergies: [{ type: Schema.Types.ObjectId, ref: 'allergies' }],
    favoriteRestaurants: [{ type: Schema.Types.ObjectId, ref: 'restaurants' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'orders' }],
    role: {
        type: String,
        enum: ['Client', 'Restaurant', 'Admin'],
        default: 'Client'
    },
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
});

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else return next();
});

/*userSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
        'facebookProvider.id': profile.id
    }, function(err, user) {
        if (!user) {
            var newUser = new that({
                username: profile.displayName,
                email: profile.emails[0].value,
                facebookProvider: {
                    id: profile.id,
                    token: accessToken
                }
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

userSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};*/

let model = mongoose.model('users', userSchema);
model.modelName = "user";
module.exports = model;
