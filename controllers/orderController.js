'use strict';

const Order = require('../models/order'),
    ApiHelper = require('../helpers/api'),
    User = require('../models/user'),
    Restaurant = require('../models/restaurant');

exports.addOrder = (req, res) => ApiHelper.addModel(req, res, Order);

exports.deleteOrderById = (req, res) => ApiHelper.deleteModelById(req, res, Order);

exports.updateOrderById = (req, res) => ApiHelper.updateModelById(req, res, Order);

exports.findAllOrders = (req, res) => ApiHelper.findAllModels(req, res, Order);

exports.findAllOrdersPopulation = (req, res) => {
    //Example to try create a population
    let population = {
        path: User.modelName, match: { username: req.query.username },
        //path: Restaurant.modelName, match: { restaurant: req.query.restaurant }
    };

    ApiHelper.findAllModelsPopulate(res, res, Order, population);
};