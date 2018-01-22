'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let orderSchema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurants' },
    restaurant: { type: String },
    restaurantPhone: { type: String },
    restaurant_location: {
        locationName: { type: String },
        address: { type: String },
        postalCode: { type: Number },
        country: { type: String },
        city: { type: String },
        lat: { type: Number },
        lng: { type: Number }
    },

    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    userName: { type: String },
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

    createDate: { type: Date, default: Date.now() },
    deliveryDate: { type: Date },
    status: [{
        state: {
            type: String,
            enum: ['Requested', 'Refused', 'Accepted', 'Delivered'],
            default: 'Requested'
        }, dataState: { type: Date, default: Date.now() }
    }],
    totalPrice: { type: Number },
    isRated: { type: Boolean },
    comment: { type: String },

    menuDetails: [{
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
    dishesDetails: [{ name: { type: String }, description: { type: String }, price: { type: Number }, ingredients: [{ ingredient: { type: String }, calories: { type: Number }, weight: { type: Number } }], stock: { type: Number }, totalCalories: { type: Number } }]
});

orderSchema.pre('save', function (next) {
    if (this.status.length === 0) {
        this.status.push('Requested');
        next();
    } else return next();
});

let model = mongoose.model('orders', orderSchema);
model.modelName = 'order';
module.exports = model;