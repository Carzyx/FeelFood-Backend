'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let allergySchema = new mongoose.Schema({
    name: { type: String, unique: true }
});

let model = mongoose.model('allergies', allergySchema);
model.modelName = 'allergy';
module.exports = model;