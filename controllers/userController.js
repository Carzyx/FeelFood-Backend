'use strict'

const User = require('../models/user');

/*
exports.addUser = function(req, res){
    Create(req, res, User);
}
*/
exports.addUser = function (req, res) {
    console.log('POST')
    console.log(req.body)

    let user = new User(req.body);

    user.save()
        .then(resp => res.status(200).send({ message: `user successfully created.`, user: resp }))
        .catch(err => res.status(500).send(`There was an error creating a user. Please try again later: ${err.message}`));
};

exports.deleteUserById = function (req, res) {
    console.log('DELETE')
    console.log(req.body)

    let user = new User(req.body);

    User.findByIdAndRemove(req.query.id)
        .then((resp, error) => {
            if (resp)
                res.status(200).send({ message: `User successfully removed.`, user: resp })
            else
                res.status(200).send({ message: `Can't find user to remove.`, user: resp })

            console.log(error);
        })
        .catch(err => res.status(500).send(500, `There was an error removing user. Please try again later: ${err.message}`));
}

exports.updateUser = function (req, res) {
    console.log('UPDATE')
    console.log(req.query.id)
    console.log(req.body);

    User.findById(req.query.id).exec()
        .then((user, error) => {
            if (error) return res.status(200).send(`User not found with id: ${req.query.id}`)
            if (user) {
                console.log(`User found, user: ${user}`);
                updateModel(user, req);
                user.save()
                    .then(resp => res.status(200).send({ message: `User successfully updated.`, user: resp }))
            }
        })
        .catch(err => res.status(500).send(`There was an error updating user. Please try again later: ${err.message}`))
};

exports.findAllUsers = function (req, res) {
    console.log('GET')

    User.find()
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => res.status(500).send(`There was an error searching all users. Please try again later: ${err.message}`));
};

function updateModel(model, req) {
    for (var index = 0; index < Object.keys(model).length; index++) {
        var element = Object.keys(model)[index];
        //Set element if is not defined        
        model[element] = model[element] || req.body[element];
    }
    return model;
}

//TODO Export CRUD to generic base
var Create = function (req, res, T) {
    console.log('POST')
    console.log(req.body)

    let model = new T(req.body);

    model.save()
        .then(resp => res.status(200).send({ message: `Successfully created.`, user: resp }))
        .catch(err => res.status(500).send(`There was an error creating a ${T}. Please try again later: ${err.message}`));
};




