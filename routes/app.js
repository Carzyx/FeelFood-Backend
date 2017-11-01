'use strict';

let express = require('express'),
app = express(),
bodyParser = require('body-parser'),
methodOverride = require('method-override');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

let router = express.Router();

// Import Controllers
let userCtrl = require('../controllers/userController');
let restaurantCtrl = require('../controllers/restaurantController');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

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



