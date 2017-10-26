'use strict'

var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
methodOverride = require('method-override');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

// Import Controllers
var userCtrl = require('../controllers/userController');
var restaurantCtrl = require('../controllers/restaurantController');

// API routes
app.use(router);

router.route('/user')
.get(userCtrl.findAllUsers)
.post(userCtrl.addUser)
.delete(userCtrl.deleteUserById)
.put(userCtrl.updateUserById);

router.route('/restaurant')
    .get(restaurantCtrl.findAllRestaurant)
    .post(restaurantCtrl.addRestaurant)
    .delete(restaurantCtrl.deleteRestaurantById)
    .put(restaurantCtrl.updateRestaurantById);


module.exports = app;



