'use strict';
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let restaurantSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    name: { type: String },
    phone: { type: Number },
    location: {
        locationName: { type: String },
        address: { type: String },
        postalCode: { type: Number },
        country: { type: String },
        city: { type: String }
    },
    tags:{
        homeDelivery:{  type: Boolean   },
        takeAway:{  type: Boolean   },
        average:{
            dish:{  type: Number  },
            menu:{  type: Number    }
        },
        description:[{
            name:{  type: String    },
            value:{ type: Number    }
        }],
    },
    menus: [{
        name: { type: String },
        description: { type: String },
        visible:{ type: Boolean },
        comments: { type: String },
        price: { type: Number },
        starters: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        firstOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        secondOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        thirdOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        drinksOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        othersOptions: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }]
    }],
    dishes: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }]
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