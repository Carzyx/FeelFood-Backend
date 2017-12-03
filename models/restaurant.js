'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let restaurantSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String },
    phone: { type: Number },
    location: {
        locationName: { type: String },
        address: { type: String },
        postalCode: { type: Number },
        country: { type: String },
        city: { type: String }
    },
    menus: [{
        name: { type: String },
        description: { type: String },
        visible:{ type: Boolean },
        comments: { type: String },
        price: { type: Number },
        starters: [{ name: { type: String }, description: { type: String }, amount: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        firstOptions: [{ name: { type: String }, description: { type: String }, amount: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        secondOptions: [{ name: { type: String }, description: { type: String }, amount: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        thirdOptions: [{ name: { type: String }, description: { type: String }, amount: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        drinksOptions: [{ name: { type: String }, description: { type: String }, amount: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }],
        othersOptions: [{ name: { type: String }, description: { type: String }, amount: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }]
    }],
    dishes: [{ name: { type: String }, description: { type: String }, amount: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }]
});

let model = mongoose.model('restaurants', restaurantSchema);
model.modelName = 'restaurant';
module.exports = model;
