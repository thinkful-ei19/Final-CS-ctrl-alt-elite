'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const client = require('../models/client');
const bcrypt = require('bcryptjs');


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

//Change password
router.put('/change-password/:id', (req, res, next) => {
  const { id } = req.params;

  const { password } = req.body;
  
  let hashedPassword;
  bcrypt.hash(password, 10).then((result) => {
    hashedPassword = result;
    return hashedPassword
  })

  let newUserInfo;
  User.findById(id)
    .then((result) => {
      newUserInfo = result;
      newUserInfo.password = hashedPassword;
      return newUserInfo;
    })
    .then(() => {
      User.findByIdAndUpdate(id, newUserInfo)
      .then((result) => {
        res.json(newUserInfo);
      })
      .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.put('/change-theme/:id', (req, res, next) => {
    const { id } = req.params;
    const { theme } = req.body;

    let response;
    User.findById(id)
      .then((result) => {
        let user = result;
        user.options = { theme };
        return user;
      })
      .then((result) => {
        response = result;        
        User.findByIdAndUpdate(id, result)
          .then((result) => {
            res.json(response);
          })
          .catch(err => next(err))
      })
      .catch(err => next(err))
})



module.exports = router;