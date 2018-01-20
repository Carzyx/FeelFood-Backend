'use strict';
const config = require('../config/config'),
    nodemailer = require('nodemailer');

exports.contactManagement = (req, res) => {
    req.checkBody('name').notEmpty();
    req.checkBody('email').isEmail();
    req.checkBody('subject').notEmpty();
    req.checkBody('message').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).send({ message: 'Missing or wrong fields.' });
    } else {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure: false,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: config.mail.user,
                pass: config.mail.password
            }
        });

        const mailOptions = {
            from: req.body.email, // sender address
            to: config.mail.user, // list of receivers
            subject: 'FeelFood contact | ' + req.body.subject,
            text: 'Hello FeelFood, ' + req.body.name + ' say: ' + req.body.message
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err);
            else {
                console.log(info);
                return res.status(200).send({message: 'Contact sent success.'});
            }
        });
    }
};