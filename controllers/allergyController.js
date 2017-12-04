'use strict';

const Allergy = require('../models/allergy'),
    ApiHelper = require('../helpers/api');

exports.addAllergy = (req, res) => {
    let conditions={name: req.body.name};
    console.log(conditions);
    ApiHelper.addModel(req, res, Allergy,conditions);
};
exports.deleteAllergyById = (req, res) => ApiHelper.deleteModelById(req, res, Allergy);
exports.findAllAllergies = (req, res) => ApiHelper.findAllModels(req, res, Allergy);
