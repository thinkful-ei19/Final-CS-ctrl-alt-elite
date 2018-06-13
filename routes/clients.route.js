'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Client = require('../models/client');


//Create a new client.
router.post('/clients/:id', (req, res, next) => {
  const { id } = req.params;

  const { email, name, phone } = req.body;

  const newClient = { email, name, phone };

  User.findById(id)
  .populate('appointments')
  .populate('clients')
    .then((result) => {
      let newUserInfo = result;
      Client.create(newClient)
        .then((result) => {
          newUserInfo.clients.push(result.id);            
          User.findByIdAndUpdate(id, newUserInfo)
          .populate('appointments')
          .populate('clients')
            .then((result) => {
              let updatedResult = result;
              updatedResult.clients = newUserInfo.clients;
              res.json(updatedResult);
            })
            .catch(err => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.delete('/clients/:id', (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  let updateUser;
  User.findById(userId)
    .then((result) => {
      let clients = [];
      updateUser = result;
      updateUser.clients.forEach((clientId) => {
        if (String(clientId) !== id) {
          clients.push(clientId);
        }                
      });
      updateUser.clients = clients;
      return updateUser;
    })
    .then((result) => {
      User.findByIdAndUpdate(userId, updateUser);
      return;
    })
    .catch(err => next(err));

  Client.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;