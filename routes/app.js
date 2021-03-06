'use strict';

let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    emailHelper = require('../helpers/email'),
    passwordHelper = require('../helpers/password'),
    imageHelper = require('../helpers/images'),
    multer = require('multer'),
    config = require('../config/config'),
    expressValidator = require('express-validator');

require('../helpers/passport')(passport);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

let router = express.Router();
app.use(router);
app.use(multer);

// Log requests to console
router.use(morgan('dev'));

//Implements CORS
router.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', "Content-Type, Authorization, Content-Length, X-Requested-With,X-Custom-Header,Origin");
    res.header('Access-Control-Allow-Credentials', "true");
    if ('OPTIONS' === req.method) {
        res.status(200).send();
    }
    else {
        next();
    }
});

// Import Controllers
let userCtrl = require('../controllers/userController');
let restaurantCtrl = require('../controllers/restaurantController');
let ingredientCtrl = require('../controllers/ingredientController');
let allergyCtrl = require('../controllers/allergyController');
let ordersCtrl = require('../controllers/orderController');


// API routes

router.route('/')
    .get(function (req, res) {
        res.status(200).send('FeelFood Api Server running!');
    });

router.route('/auth/facebook')
    .get(passport.authenticate('facebook', { scope: ['email'] }));

router.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', { session: false, failureRedirect: config.publicAddress + ':4200/login' }), userCtrl.setToken);

router.route('/auth/facebook/user')
    .post(userCtrl.loginUserFacebook);

router.route('/login')
    .post(userCtrl.loginUser, restaurantCtrl.loginRestaurant);

router.route('/user/signup')
    .post(userCtrl.addUser);
router.route('/restaurant/signup')
    .post(restaurantCtrl.addRestaurant);


router.route('/user')
    .get(passport.authenticate('jwt', { session: false }), userCtrl.findUser)
    .post(passport.authenticate('jwt', { session: false }), userCtrl.addUser)
    .delete(passport.authenticate('jwt', { session: false }), userCtrl.deleteUserById)
    .put(passport.authenticate('jwt', { session: false }), userCtrl.updateUserById);

router.route('/user/all')
    .get(passport.authenticate('jwt', { session: false }), userCtrl.findAllUsers);

router.route('/restaurant')
    .get(passport.authenticate('jwt', { session: false }), restaurantCtrl.findRestaurant)
    .post(passport.authenticate('jwt', { session: false }), restaurantCtrl.addRestaurant)
    .delete(passport.authenticate('jwt', { session: false }), restaurantCtrl.deleteRestaurantById)
    .put(passport.authenticate('jwt', { session: false }), restaurantCtrl.updateRestaurantById);

router.route('/restaurant/public')
    .get(restaurantCtrl.findRestaurantPublic);

router.route('/search')
    .get(restaurantCtrl.findRestaurantByName)
    .post(restaurantCtrl.findRestaurantByConditions);
router.route('/speedSearch')
    .get(restaurantCtrl.findRestaurantsNamesByName);

router.route('/restaurants')
    .get(restaurantCtrl.findAllRestaurant);

router.route('/ingredient')
    .get(ingredientCtrl.findIngredient)
    .post(ingredientCtrl.addIngredient)
    .delete(ingredientCtrl.deleteIngredientById)
    .put(ingredientCtrl.updateIngredientById);

router.route('/ingredients')
    .get(ingredientCtrl.findAllIngredients);

router.route('/allergies')
    .get(allergyCtrl.findAllAllergies)
    .post(allergyCtrl.addAllergy)
    .delete(allergyCtrl.deleteAllergyById);

router.route('/orders')
    .get(passport.authenticate('jwt', { session: false }), ordersCtrl.findOrder)
    .post(passport.authenticate('jwt', { session: false }), ordersCtrl.addOrder)
    .put(passport.authenticate('jwt', { session: false }), ordersCtrl.updateOrderById);

router.route('/contact')
    .post(emailHelper.contactManagement);

router.route('/resetPassword')
    .post(passwordHelper.forgotPassword);

router.route('/resetPassword/new')
    .post(passwordHelper.resetPassword);

router.route('/images/avatar')
    .post(passport.authenticate('jwt', { session: false }), imageHelper.avatarUpload);

router.route('/images/restaurant')
    .post(passport.authenticate('jwt', { session: false }), imageHelper.imageUpload);

module.exports = app;