'use strict'

const Restaurant = required('../models/restaurant');


exports.addRestaurant = (req, res) => Restaurant.add(req, res, Restaurant);

exports.deleteRestaurantById = (req, res) => Restaurant.findOneAndRemove(req, res, Restaurant);

exports.updateRestaurantById = (req, res) => ApiHelper.updateModelById(req, res, Restaurant);

exports.findAllRestaurant = (req, res) => ApiHelper.findAllModels(req, res, Restaurant);