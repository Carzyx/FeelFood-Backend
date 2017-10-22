'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let ingredientSchema = new mongoose.Schema({
    name: { type: String },
    calories: {type:Number}    
});

var model = mongoose.model('ingredients', ingredientSchema);
model.modelName = 'ingredient';
module.exports = model;
