'use strict';


const Restaurant = require('../models/restaurant'),
    ApiHelper = require('../helpers/api');


exports.addRestaurant = (req, res) => {
    let conditions={name: req.body.name};
    console.log(conditions);
    ApiHelper.addModel(req, res, Restaurant,conditions);
};

exports.deleteRestaurantById = (req, res) => ApiHelper.deleteModelById(req, res, Restaurant);

exports.updateRestaurantById = (req, res) => ApiHelper.updateModelById(req, res, Restaurant);

exports.findAllRestaurant = (req, res) => ApiHelper.findAllModels(req, res, Restaurant);

exports.findRestaurant=(req,res)=> Restaurant.findOne({name:req.body.name});

exports.findRestaurants=(req,res)=> Restaurant.find({name:req.body.name});