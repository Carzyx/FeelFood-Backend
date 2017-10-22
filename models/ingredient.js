'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let ingredientSchema = new mongoose.Schema({
    name: { type: String },
    calories: {type:Number}    
});

module.exports = mongoose.model('ingredients', ingredientSchema);
