const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user')
const Appointment = require('../models/appointment')
const client = require('../models/client')


//Get all information pertaining to one user.
router.get('/users/:id', (req, res, next) => {
    const { id } = req.params;
    
    User.findById(id)
        .populate('appointments')
        .populate('clients')
        .then((results) => {
            res.json(results)
        })
        .catch((err) => {
            next(err);
        })

});



module.exports = router;