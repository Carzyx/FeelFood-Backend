'use strict';

let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    morgan = require('morgan'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken');

require('../helpers/passport')(passport);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());

let router = express.Router();
app.use(router);

// Log requests to console
router.use(morgan('dev'));

//Implements CORS
router.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
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
let ingredientCtrl = require ('../controllers/ingredientController');
let allergyCtrl = require ('../controllers/allergyController');


// API routes

router.route('/')
    .get(function (req,res) {
        res.status(200).send('FeelFood Api Server running!');
    });

router.route('/auth/facebook')
    .get(passport.authenticate('facebook', { scope : ['email'] }));

router.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', { session: false,  failureRedirect: 'http://localhost:4200/login' }), function (req,res) {
        let token = jwt.sign({username: req.user._doc.username, email: req.user._doc.email, _id: req.user._doc.id}, config.secret, {
            expiresIn: 10800 //Seconds
        });
        res.redirect('http://localhost:4200/auth/' + req.user._doc.username + '/' + token);
    });

router.route('/login')
    .post(userCtrl.loginUser);
router.route('/signup')
    .post(userCtrl.addUser);

router.route('/user')
    .get(passport.authenticate('jwt', { session: false }),userCtrl.findUser)
    .post(passport.authenticate('jwt', { session: false }), userCtrl.addUser)
    .delete(passport.authenticate('jwt', { session: false }), userCtrl.deleteUserById)
    .put(passport.authenticate('jwt', { session: false }), userCtrl.updateUserById);

router.route('/user/all')
    .get(passport.authenticate('jwt', { session: false }),userCtrl.findAllUsers);

router.route('/restaurant')
    .get(restaurantCtrl.findRestaurant)
    .post(restaurantCtrl.addRestaurant)
    .delete(restaurantCtrl.deleteRestaurantById)
    .put(restaurantCtrl.updateRestaurantById);

router.route('/restaurant/dish')
    .get(restaurantCtrl.findAllRestaurant)
    .post(restaurantCtrl.addRestaurant)
    .delete(restaurantCtrl.deleteRestaurantById)
    .put(restaurantCtrl.updateRestaurantById);

router.route('/restaurants')
    .get(restaurantCtrl.findAllRestaurant);

router.route('/ingredient')
    .get(ingredientCtrl.findAllIngredients)
    .post(ingredientCtrl.addIngredient)
    .delete(ingredientCtrl.deleteIngredientById)
    .put(ingredientCtrl.updateIngredientById);
router.route('/ingredient/')
    .get(ingredientCtrl.findIngredient);

router.route('/allergies')
    .get(allergyCtrl.findAllAllergies)
    .post(allergyCtrl.addAllergy)
    .delete(allergyCtrl.deleteAllergyById);

module.exports = app;