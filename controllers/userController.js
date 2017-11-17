'use strict';

const User = require('../models/user'),
    ApiHelper = require('../helpers/api'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken');

exports.addUser = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        res.status(400).send({message: 'Please enter all fields.'});
    } else {
        let conditions = {$or: [{email: req.body.email}, {username: req.body.username}]};
        ApiHelper.addModel(req, res, User, conditions);
    }
};

exports.signIn = (req,res) => {
    User.findOne({email: req.body.email}, function (err,user) {
        if (err) return res.status(500).send({message: err});
        if (!user) return res.status(404).send({message: 'User not found.'});
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign({username: user.username, email: user.email, _id: user.id}, config.secret, {
                expiresIn: 10800 //Seconds
            });
            return res.status(200).send({ message: 'Authenticated', token: token });
        } else return res.status(400).send({message: 'User or password is not correct!!!'});
    }).select('+password');
};

exports.deleteUserById = (req, res) => ApiHelper.deleteModelById(req, res, User);

exports.updateUserById = (req, res) => ApiHelper.updateModelById(req, res, User);

exports.findAllUsers = (req, res) => ApiHelper.findAllModels(req, res, User);

exports.findUser=(req,res) => {
    let conditions={username: req.query.username};
    ApiHelper.findOneModel(req, res, User,conditions);
};