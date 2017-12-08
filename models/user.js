'use strict';
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
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
    lastLogin: Date
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
