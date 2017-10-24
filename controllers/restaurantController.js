'use strict'

const Restaurant = require('../models/restaurant');


exports.addRestaurant = (req, res) =>{
    Restaurant.findOne({name:req.body.name}).then(function (body) {
            if(body==undefined)
                ApiHelper.addModel(req, res, Restaurant);
            else
                res.status(500).send({ message: `The name of:${req.body.name} is already in use.`});
        }
    )

};

exports.deleteRestaurantById = (req, res) => ApiHelper.deleteModelById(req, res, Restaurant);

exports.updateRestaurantById = (req, res) => ApiHelper.updateModelById(req, res, Restaurant);

exports.findAllRestaurant = (req, res) => ApiHelper.findAllModels(req, res, Restaurant);

exports.findRestaurant=(req,res)=> Restaurant.findOne({name:req.body.name});

exports.findRestaurants=(req,res)=> Restaurant.find({name:req.body.name});