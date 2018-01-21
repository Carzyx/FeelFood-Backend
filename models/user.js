'use strict';
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    validate = require('mongoose-validator'),
    titlize = require('mongoose-title-case'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const usernameValidator = [
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must be contain letters and numbers only.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 15],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Must be a valid email.'
    }),
    validate({
        validator: 'isLength',
        arguments: [5, 20],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

const passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [8],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: usernameValidator
    },
    password: {
        type: String,
        select: false,
        validate: passwordValidator
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: emailValidator
    },
    firstName: String,
    lastName: String,
    locations: [{
        locationName: { type: String },
        address: { type: String },
        postalCode: { type: String },
        country: { type: String },
        city: { type: String },
        lat: { type: Number },
        lng: { type: Number }
    }],
    allergies: [{
        name: String
    }],
    //allergies: [{ type: Schema.Types.ObjectId, ref: 'allergies' }],
    favoriteRestaurants: [{ type: Schema.Types.ObjectId, ref: 'restaurants' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'orders' }],
    role: {
        type: String,
        enum: ['Client', 'Restaurant', 'Admin'],
        default: 'Client'
    },
    avatar: String,
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date,
    nextLastLogin: Date,
    token: String,
    tokenFb: String,
    resetToken: String
});

userSchema.plugin(titlize, {
    paths: [ 'username', 'firstName', 'lastName', { path: 'locations.locationName'}]
});

userSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else return next();
});

let model = mongoose.model('users', userSchema);
model.modelName = "user";
module.exports = model;
