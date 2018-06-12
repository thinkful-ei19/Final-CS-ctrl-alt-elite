'use strict';
require("dotenv").config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user')
const Appointment = require('../models/appointment')
const nodemailer = require('nodemailer');

//Create a new appointment.
router.post('/appointments/:id', (req, res, next) => {
  const { id } = req.params;

  const { time, client, notes } = req.body;

  const newApt = { time, client, notes };

  User.findById(id)
    .populate('appointments')
    .populate('clients')
    .then((result) => {
      let newUserInfo = result;
      Appointment.create(newApt)
        .then((result) => {
          newUserInfo.appointments.push(result.id);            
          User.findByIdAndUpdate(id, newUserInfo)
            .populate('appointments')
            .populate('clients')
            .then((result) => {
              let updatedResult = result;
              updatedResult.appointments = newUserInfo.appointments;
              res.json(updatedResult);
            })
            .catch(err => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err))

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
          }
    })
      
    let mailOptions = {
        from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
        to: 'julieskim160@gmail.com',  
        subject: `Your ${newApt.time} Appointment with CTRL ALT ELITE`,
        html: `<p>Hi ${newApt.client}, <br/> Your appointment has been scheduled
        with CTRL ALT ELITE at ${newApt.time}. <br/>Thank you for scheduling with us.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent', info.messageId);
    });
})


router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  let updateUser;
  User.findById(userId)
    .then((result) => {
      let appointments = [];
      updateUser = result;
      updateUser.appointments.forEach((aptId) => {
        if (String(aptId) !== id) {
          appointments.push(aptId);
        }                
      });
      updateUser.appointments = appointments;
      return updateUser;
    })
    .then((result) => {
      User.findByIdAndUpdate(userId, updateUser);
      return;
    })
    .catch(err => next(err));

  Appointment.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;