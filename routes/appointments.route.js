const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user')
const Appointment = require('../models/appointment')


//Create a new appointment.
router.post('/appointments/:id', (req, res, next) => {
    const { id } = req.params;

    const { time, client, notes } = req.body;

    const newApt = { time, client, notes }

    User.findById(id)
    .then((result) => {
        let newUserInfo = result;
        Appointment.create(newApt)
        .then((result) => {
            newUserInfo.appointments.push(result.id)            
            User.findByIdAndUpdate(id, newUserInfo)
            .then((result) => {
                let updatedResult = result;
                updatedResult.appointments = newUserInfo.appointments;
                res.json(updatedResult);
            })
            .catch(err => next(err))
        })
        .catch((err) => next(err))
    })
    .catch((err) => next(err))
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
                    appointments.push(aptId)
                }                
            })
            updateUser.appointments = appointments;
            return updateUser;
        })
        .then((result) => {
            User.findByIdAndUpdate(userId, updateUser)
            return;
        })
        .catch(err => next(err))

    Appointment.findByIdAndRemove(id)
        .then((result) => {
            res.status(204).end();
        })
        .catch((err) => {
            next(err)
    })
})

module.exports = router;