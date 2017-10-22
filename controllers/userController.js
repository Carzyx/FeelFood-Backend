'use strict'

const User = require('../models/user'),
    ApiHelper = require('../helpers/api');

exports.addUser = (req, res) => ApiHelper.addModel(req, res, User);

exports.deleteUserById = (req, res) => ApiHelper.deleteModelById(req, res, User);

exports.updateUserById = (req, res) => ApiHelper.updateModelById(req, res, User);

exports.findAllUsers = (req, res) => ApiHelper.findAllModels(req, res, User);