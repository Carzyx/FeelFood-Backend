'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
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
    isAdmin: { type: Boolean }
});

module.exports = mongoose.model('users', userSchema);
