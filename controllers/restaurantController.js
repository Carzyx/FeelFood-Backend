'use strict'

const Restaurant = required('../models/restaurant');


exports.addRestaurant = (req, res) =>{
    if(Restaurant.findOne({name:req.body.name})== undefined)
        res.status(500).send({ message: `The name of:${req.body.name}is already in use.`});
    else
        ApiHelper.addModel(req, res, Restaurant)};

exports.deleteRestaurantById = (req, res) => ApiHelper.deleteModelById(req, res, Restaurant);

exports.updateRestaurantById = (req, res) => ApiHelper.updateModelById(req, res, Restaurant);

exports.findAllRestaurant = (req, res) => ApiHelper.findAllModels(req, res, Restaurant);

exports.findRestaurant=(req,res)=> Restaurant.findOne({name:req.body.name});

exports.findRestaurants=(req,res)=> Restaurant.find({name:req.body.name});