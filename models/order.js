'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let orderSchema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurants' },
    restaurant: { type: String },
    restaurant_location: {
        locationName: { type: String },
        address: { type: String },
        postalCode: { type: Number },
        country: { type: String },
        city: { type: String },
        lat: { type: Number },
        lng: { type: Number }
    },

    username_id: { type: Schema.Types.ObjectId, ref: 'users' },
    firstName: { type: String },
    lastName: { type: String },
    user_location: {
        locationName: { type: String },
        address: { type: String },
        postalCode: { type: Number },
        country: { type: String },
        city: { type: String },
        lat: { type: Number },
        lng: { type: Number }
    },

    createDate: { type: Date },
    deliveryDate: { type: Date },
    status: [{ state: { type: String }, dataState: { type: Date } }],
    totalPrice: { type: Number },
    comment: { type: String },

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
    dishes: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }]
});

let model = mongoose.model('orders', orderSchema);
model.modelName = 'order';
module.exports = model;