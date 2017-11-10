'use strict';

let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    morgan = require('morgan');

require('../helpers/passport')(passport);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(passport.initialize());
//app.use(passport.session());

let router = express.Router();
// Log requests to console
router.use(morgan('dev'));
app.use(router);

// Import Controllers
let userCtrl = require('../controllers/userController');
let restaurantCtrl = require('../controllers/restaurantController');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// API routes
router.post('/register', userCtrl.addUser);
router.post('/authenticate', userCtrl.signIn);

router.route('/user')
    .get(passport.authenticate('jwt', { session: false }), userCtrl.findAllUsers)
    .post(passport.authenticate('jwt', { session: false }), userCtrl.addUser)
    .delete(passport.authenticate('jwt', { session: false }), userCtrl.deleteUserById)
    .put(passport.authenticate('jwt', { session: false }), userCtrl.updateUserById);

router.route('/user/:username')
    .get(passport.authenticate('jwt', { session: false }), userCtrl.findUser);

router.route('/restaurant')
    .get(restaurantCtrl.findAllRestaurant)
    .post(restaurantCtrl.addRestaurant)
    .delete(restaurantCtrl.deleteRestaurantById)
    .put(restaurantCtrl.updateRestaurantById);

module.exports = app;
