'use strict';

const User = require('../models/user'),
    ApiHelper = require('../helpers/api'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken');

exports.addUser = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        res.status(400).send({ message: 'Please enter all fields.' });
    } else {
        let conditions = { $or: [{ email: req.body.email }, { username: req.body.username }] };
        ApiHelper.addModel(req, res, User, conditions);
    }
};

exports.loginUser = (req, res) => {

    let conditions = { email: req.body.email };
    User.findOne(conditions, function (err, resp) {

        if (err)
            return res.status(500).send(`There was an error searching all ${T.modelName}, please try again later. Error: ${err.message}`);

        if (!resp)
            return res.status(200).send({ message: 'E-mail or password is not correct', user: resp });

        //1º validate password hash are equals or 2º validate password decoded with password encoded.
        if (req.body.password === resp.password || bcrypt.compareSync(req.body.password, resp.password)) {

            let token = jwt.sign({ username: resp.username, email: resp.email, _id: resp.id }, config.secret, {
                expiresIn: 10800 //Seconds
            });
            delete resp._doc.password;
            return res.status(200).send({ success: true, message: 'Authenticated!', token: token, user: resp });
        }
        return res.status(200).send({ message: 'E-mail or password is not correct', token: null, user: resp });
    }).select('+password');
};

exports.deleteUserById = (req, res) => ApiHelper.deleteModelById(req, res, User);

exports.updateUserById = (req, res) => ApiHelper.updateModelById(req, res, User);

exports.findAllUsers = (req, res) => ApiHelper.findAllModels(req, res, User);

exports.findUser = (req, res) => {
    let conditions = { username: req.query.username };
    ApiHelper.findOneModel(req, res, User, conditions);
};