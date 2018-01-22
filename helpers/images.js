'use strict';
const config = require('../config/config'),
    multer = require('multer'),
    User = require('../models/user'),
    Restaurant = require('../models/restaurant'),
    fs = require('fs'),
    cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            let err = new Error();
            err.code = 'FILE_TYPE';
            return cb(err);
         } else {
            cb (null, Date.now() + '_' + req.query.id + '.' + file.originalname.split('.')[1]);
        }
    }
});

let upload = multer({
    storage: storage,
    limits: {fileSize: 5000000}
}).single('image');


exports.avatarUpload = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.status(400).send({ message: 'File size exceed. Max limit is 5MB.' });
            } else if (err.code === 'FILE_TYPE') {
                res.status(400).send({ message: 'File type invalid. Allowed .jpeg .jpg .png only.' });
            } else {
                console.log(err);
                res.status(400).send({ message: 'File was not able to be uploaded.' });
            }
        } else {
            if (!req.file) {
                res.status(400).send({ message: 'No file was provided.' });
            } else {
                cloudinary.uploader.upload(req.file.path, {folder: '/avatar', use_filename: true, overwrite: true}, (err,result) => {
                    console.log(result);
                    User.findById(req.query.id, (err, user) => {
                        if (err) return res.status(500).send({message: 'Error on data base: ' + err});
                        if (!user) {
                            Restaurant.findById(req.query.id, (err, restaurant) => {
                                if (err) return res.status(500).send({message: 'Error on data base: ' + err});
                                if (!restaurant) {
                                    return res.status(400).send({message: 'No user was found.'});
                                } else {
                                    restaurant.avatar = result.url;
                                    restaurant.save()
                                        .then(resp => {
                                            fs.unlink(req.file.path, err => {
                                                if (err) throw err;
                                                res.status(201).send({
                                                    success: true,
                                                    message: 'Your avatar has been changed.'
                                                });
                                            });
                                        })
                                        .catch(err => res.status(500).send({message: 'Error on save in data base: ' + err}));
                                }
                            });
                        } else {
                            user.avatar = result.url;
                            user.save()
                                .then(resp => {
                                    fs.unlink(req.file.path, err => {
                                        if (err) throw err;
                                        res.status(201).send({
                                            success: true,
                                            message: 'Your avatar has been changed.'
                                        });
                                    });
                                })
                                .catch(err => res.status(500).send({message: 'Error on save in data base: ' + err}));
                        }
                    });
                });
            }
        }
    });
};

exports.imageUpload = (req, res) => {
    Restaurant.findById(req.query.id, (err, restaurant) => {
        if (err) res.status(500).send({message: 'Error on data base: ' + err});
        if (!restaurant) {
            res.status(400).send({message: 'Restaurant does not exist.'});
        } else {
            if (restaurant.images.length >= 4){
                res.status(202).send({message: 'Restaurant already have maximum number of images.'});
            } else {
                upload(req, res, (err) => {
                    if (err) {
                        if (err.code === 'LIMIT_FILE_SIZE') {
                            res.status(400).send({ message: 'File size exceed. Max limit is 10MB.' });
                        } else if (err.code === 'FILE_TYPE') {
                            res.status(400).send({ message: 'File type invalid. Allowed .jpeg .jpg .png only.' });
                        } else {
                            console.log(err);
                            res.status(400).send({ message: 'File was not able to be uploaded.' });
                        }
                    } else {
                        if (!req.file) {
                            res.status(400).send({ message: 'No file was provided.' });
                        } else {
                            cloudinary.uploader.upload(req.file.path, {folder: '/restaurant', use_filename: true, overwrite: true}, (err,result) => {
                                console.log(result);
                                restaurant.update({$push: {images: {name: result.public_id, url: result.url}}})
                                    .then(resp => {
                                        fs.unlink(req.file.path, err => {
                                            if (err) throw err;
                                            else res.status(201).send({success: true, message: 'Restaurant image has been uploaded.'});
                                        });
                                    })
                                    .catch(err => res.status(500).send({message: 'Error on save in data base: ' + err}));
                            });
                        }
                    }
                });
            }
        }
    });
};