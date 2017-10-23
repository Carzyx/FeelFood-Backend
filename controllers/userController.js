'use strict'

const User = require('../models/user'),
    ApiHelper = require('../helpers/api');

exports.addUser = (req, res) => {
    if(User.findOne(req.body.username)==undefined)
        ApiHelper.addModel(req, res, User);
    else
        res.status(500).send({ message: `The name of:${req.body.name}is already in use.`});
};

exports.deleteUserById = (req, res) => ApiHelper.deleteModelById(req, res, User);

exports.updateUserById = (req, res) => ApiHelper.updateModelById(req, res, User);

exports.findAllUsers = (req, res) => ApiHelper.findAllModels(req, res, User);