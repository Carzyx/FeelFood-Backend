'use strict';

const Restaurant = require('../models/restaurant'),
    ApiHelper = require('../helpers/api'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken');

exports.loginRestaurant = (req, res) => {
    console.log(req.body)

    let conditions = { email: req.body.email };
    Restaurant.findOne(conditions, function (err, resp) {
        console.log(JSON.stringify(resp))

        if (err)
            return res.status(500).send(`There was an error searching all ${T.modelName}, please try again later. Error: ${err.message}`);

        if (!resp)
            return res.status(200).send({ message: 'E-mail or password is not correct', restaurant: resp });

        //1º validate password hash are equals or 2º validate password decoded with password encoded.
        if (req.body.password === resp.password || bcrypt.compareSync(req.body.password, resp.password)) {

            let token = jwt.sign({ username: resp.username, email: resp.email, _id: resp.id }, config.secret, {
                expiresIn: 10800 //Seconds
            });
            delete resp._doc.password;
            return res.status(200).send({ success: true, message: 'Authenticated!', token: token, restaurant: resp });
        }
        return res.status(200).send({ message: 'E-mail or password is not correct', token: null });
    }).select('+password');
};

exports.addRestaurant = (req, res) => {

    if (!req.body.email || !req.body.password || !req.body.username) {
        res.status(400).send({ message: 'Please enter all fields.' });
    } else {
        let conditions = { $or: [{ email: req.body.email }, { username: req.body.username }] };
        ApiHelper.addModel(req, res, Restaurant, conditions);
    }
};
exports.deleteRestaurantByName = (req, res) => ApiHelper.deleteModelByName(req, res, Restaurant);

exports.deleteRestaurantById = (req, res) => ApiHelper.deleteModelById(req, res, Restaurant);

exports.updateRestaurantById = (req, res) => {
    if (req.body.password){
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return err;
            bcrypt.hash(req.body.password, salt, null, function(err, hash) {
                if (err) return err;
                req.body.password = hash;
            });
        });
    }
    ApiHelper.updateModelById(req, res, Restaurant);
};

exports.findAllRestaurant = (req, res) => ApiHelper.findAllModels(req, res, Restaurant);

exports.findRestaurant = (req, res) => {
    let conditions = { _id: req.query.id };
    ApiHelper.findOneModel(req, res, Restaurant, conditions);
};