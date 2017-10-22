'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let dishSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    amount: { type: Number },
    ingredients: [{
        ingredient: { type: String },
        calories: { type: Number },
        weight: { type: Number }
    }],
    stock: { type: Number },
    totalCalories: { type: Number }
});

module.exports = mongoose.model('dishes', dishSchema);
