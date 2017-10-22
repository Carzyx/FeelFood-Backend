'use strict'

const Order = require('../models/order');

exports.addOrder = function (req, res){
    console.log('POST')
    console.log(req.body)

    let order = new Order(req.body);

    order.save()
    .then(resp => res.status(200).send({ message: `order successfully created.`, order: resp }))
    .catch(err => res.status(500).send(`There was an error creating a order. Please try again later: ${err.message}`));
};

exports.findAllOrders = function (req, res) {
    console.log('GET')

    Order.find()
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => res.status(500).send(`There was an error searching all orders. Please try again later: ${err.message}`));
};

