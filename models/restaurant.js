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
        message: 'Must be contain letters and numbers only.'
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

let restaurantSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validator : usernameValidator
    },
    password: {
        type: String,
        required: true,
        select: false,
        validator: passwordValidator
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validator: emailValidator
    },
    name: { type: String },
    phone: { type: String },
    locations: {
        type: [{
            locationName: { type: String },
            address: { type: String },
            postalCode: { type: Number },
            country: { type: String },
            city: { type: String },
            lat: { type: Number },
            lng: { type: Number }
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 1']
    },
    tags: {
        homeDelivery: { type: Boolean },
        takeAway: { type: Boolean },
        average: {
            dish: { type: Number },
            menu: { type: Number }
        },
        description: [{
            name: { type: String },
            value: { type: Number }
        }],
    },
    ratings: [{
        key: { type: String },
        value: { type: Number }
    }],
    menus: [{
        name: { type: String },
        description: { type: String },
        visible: { type: Boolean },
        comments: { type: String },
        price: { type: Number },
        starters: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        firstOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        secondOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        thirdOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        drinksOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        othersOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }]
    }],
    dishes: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
    avatar: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'orders' }],
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date,
    nextLastLogin: Date
});

function arrayLimit(val) {
    return val.length <= 1;
}

restaurantSchema.plugin(titlize, {
    paths: [ 'username', 'name', { path: 'locations.locationName'}]
});

restaurantSchema.pre('save', function (next) {
    let restaurant = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(restaurant.password, salt, null, function (err, hash) {
                if (err) return next(err);
                restaurant.password = hash;
                next();
            });
        });
    } else return next();
});

let model = mongoose.model('restaurants', restaurantSchema);
model.modelName = "restaurant";
module.exports = model;