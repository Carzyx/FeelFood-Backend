'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let orderSchema = new mongoose.Schema({
    username: { type: Schema.Types.ObjectId, ref: 'users' },
    restaurant: { type: Schema.Types.ObjectId, ref: 'restaurants' },
    createDate: { type: Date },
    status: [{ state: { type: String }, dataState: { type: Date } }],
    price:{ type: String },
    location: {
        locationName: { type: String },
        address: { type: String },
        postalCode: { type: Number },
        country: { type: String },
        city: { type: String }
    },
    totalPrice: { type: Number },
    orderDetails: {
        listDish: [{
            product: { type: String },
            description: { type: String },
            amount: { type: Number },
            price : { type: Number }
        }]
    }
});

let model = mongoose.model('orders', orderSchema);
model.modelName = 'order';
module.exports = model;