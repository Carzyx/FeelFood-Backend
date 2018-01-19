'use strict';

const Order = require('../models/order'),
    ApiHelper = require('../helpers/api'),
    User = require('../models/user'),
    Restaurant = require('../models/restaurant');

exports.addOrder = (req, res) => {
    console.log(req.body);
    Order.findOne({createDate: req.body.createDate},function (err, order) {
        if(err) return res.status(500).send({message : 'Error on data base: ' + err});
        if(!order){
            let newOrder = new Order(req.body);
            newOrder.save()
                .then(order => {
                    User.findOneAndUpdate({_id : req.body.user_id}, {$push: {orders: order._id.toString()}}, {new : true})
                        .then(resp =>{
                            Restaurant.findOneAndUpdate({_id : req.body.restaurant_id}, {$push: {orders: order._id.toString()}}, {new : true})
                                .then(resp => res.status(200).send({ message: 'Order successfully created.' }))
                                .catch(err => res.status(500).send({message : 'Error on save in data base: ' + err}));
                        })
                        .catch(err => res.status(500).send({message : 'Error on save in data base: ' + err}));
                })
                .catch(err => res.status(500).send({message : 'Error on save in data base: ' + err}));
        } else return res.status(404).send({message : 'Order already exist'});
    });
};

exports.findOrder = (req, res) => {
    Order.findById(req.query.id, function (err, order) {
        if (err) return res.status(500).send({message: 'Error on data base: ' + err});
        if (!order) return res.status(500).send({message: 'Order not found.'});
        res.status(200).jsonp(order);
    });
};


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