'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const client = require('../models/client');


//Get all information pertaining to one user.
router.post('/users', (req, res, next) => {
  const { username } = req.body;

  let currentUser = "User Not Found";
  User.find()
    .populate('appointments')
    .populate('clients')
    .then((users) => {
      users.forEach((user) => {
        if (user.username === username) {
          currentUser = user
        }
      })
    })
    .then(() => {
      res.json(currentUser)
    })
    .catch(err => next(err))


});

router.get('/users/:id', (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
  .populate('appointments')
  .populate('clients')
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    next(err);
  });

})


module.exports = router;