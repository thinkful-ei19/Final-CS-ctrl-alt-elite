'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const nodemailer = require('nodemailer');
const moment = require('moment');
// const {CronJob} = require('cron');

// const job = new CronJob({
  
//   // cronTime: '*/1 * * * *',
//   onTick: function() {
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS
//       }
//     });

//     // const appointmentTime = moment(appointmentTime).format('MMMM Do YYYY, h:mm:ss a');
//     const 
//     Appointment.find()
//       .then((results)=> {
//         const now = (Number(moment().format().from(appt.time)))

//         console.log('hshshshshshhshhshshs');

//         let mailOptions = {
//           from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
//           to: 'cjszk@hotmail.com',  
//           subject: `REMINDER: Your 2:00 Appointment with CTRL ALT ELITE`,
//           html: `<p>Hi Chris, <br/> This is a friendly reminder for your appointment
//             with CTRL ALT ELITE is at 2:00. <br/>Looking forward to seeing you soon! <br/><br/>If you need to schedule, please contact us at PHONE NUMBER. </p>`
//         };
//         transporter.sendMail(mailOptions, function (error, response) {
//           console.log('Message sent: ' + response.message);
//           transporter.close();
//         });
//       });
    // Appointment.find({time:{$lt:date.parse(Date.now())+date.parse(Date.now()+(2*24*60*60*1000))}})
    // Appointment.find()
    //   .then((results)=> {
    //     console.log(Number(moment().hours()))
    //     console.log('hshshshshshhshhshshs');
    //     let mailOptions = {
    //       from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
    //       to: `${appt.client.email}`,  
    //       subject: `REMINDER: Your ${appointmentTime} Appointment with CTRL ALT ELITE`,
    //       html: `<p>Hi ${appt.client.name}, <br/> This is a friendly reminder for your appointment
    //         with CTRL ALT ELITE is at ${appt.time}. <br/>Looking forward to seeing you soon! <br/><br/>If you need to schedule, please contact us at PHONE NUMBER. </p>`
    //     };
    //     transporter.sendMail(mailOptions, function (error, response) {
    //       console.log('Message sent: ' + response.message);
    //       transporter.close();
    //     });
    //   });
//   },
//   start: false,
//   timeZone: 'America/Los_Angeles'
// });
// job.start();


// const { dbConnect } = require('./db-mongoose');
// const agenda = require('agenda');

// const mongoConnection = 'mongodb://user:password123@ds255930.mlab.com:55930/final-capstone'
// const agenda = new Agenda ({db: {address:mongoConnection}})


// agenda.define('send appointment reminder', {priority: 'high'}, function(job, done) {
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.GMAIL_USER,
//             pass: process.env.GMAIL_PASS
//           }
//     })
    
//     const appointmentTime = moment(appt.time).format('MMMM Do YYYY, h:mm:ss a')
//     const appt = {client, time}

//     //maybe add a creatorID
    
//     Appointment.find({time:{$lt:date.parse(Date.now())+date.parse(Date.now()+(2*24*60*60*1000))}})
//       .then((results)=> {
//         results.forEach()
//         let mailOptions = {
//             from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
//             to: `${appt.client.email}`,  
//             subject: `REMINDER: Your ${appointmentTime} Appointment with CTRL ALT ELITE`,
//             html: `<p>Hi ${appt.client.name}, <br/> This is a friendly reminder for your appointment
//             with CTRL ALT ELITE is at ${appt.time}. <br/>Looking forward to seeing you soon! <br/><br/>If you need to schedule, please contact us at PHONE NUMBER. </p>`
//         };
//         transporter.sendMail(mailOptions, function (error, response) {
//             console.log('Message sent: ' + response.message);
//             transporter.close();
//             done();
//         });
//       })




// })

// agenda.on('24 hours before', function() {
//     agenda.schedule('24 hours before', )
//     agenda.start();
// })


//router.post() 
//make endpoint for cron job, then query mongo, if <24 hr, 
//send out email
//node-cron stores it elsewhere 

//Create a new appointment.
router.post('/appointments/:id', (req, res, next) => {
  const { id } = req.params;

  const { time, client, notes } = req.body;

  const newApt = { time, client, notes };

  console.log(newApt);

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
    .catch((err) => next(err));

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
      
  const appointmentTime = moment(newApt.time).format('MMMM Do YYYY, h:mm:ss a');

  let mailOptions = {
    from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
    to: `${newApt.client.email}`,  
    subject: `Your ${appointmentTime} Appointment with CTRL ALT ELITE`,
    html: `<p>Hi ${newApt.client.name}, <br/> Your appointment has been scheduled
        with CTRL ALT ELITE at ${newApt.time}. <br/>Thank you for scheduling with us.</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent', info.messageId);
  });
});

router.put('/appointments/:id', (req, res, next) => {
  const { id } = req.params;

  const { time, client, notes } = req.body;

  const newApt = { time, client, notes }

  console.log(newApt)

  Appointment.findByIdAndUpdate(id, newApt)
    .then((result) => {
      res.json(newApt)
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });
    
      const appointmentTime = moment(newApt.time).format('MMMM Do YYYY, h:mm:ss a');
    
      let mailOptions = {
        from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
        to: `${newApt.client.email}`,  
        subject: `RESCHEDULE: Your new Appointment time is ${appointmentTime} with CTRL ALT ELITE`,
        html: `<p>Hi ${newApt.client.name}, <br/> Your appointment has successfully been rescheduled for ${appointmentTime}. 
            <br/>We look forward to seeing you.</p>`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent', info.messageId);
      });
    })
    .catch((err) => next(err))
})

router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  let deletedApt;
  let updateUser;


  User.findById(userId)
    .populate('appointments')
    .populate('clients')
    .then((result) => {
      console.log('!!!!', result);
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
  Appointment.findById(id)
    .then((result) => {
      deletedApt = result;
      // console.log(deletedApt);
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });
    
      const appointmentTime = moment(deletedApt.time).format('MMMM Do YYYY, h:mm:ss a');
    
      let mailOptions = {
        from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
        to: `${deletedApt.client.email}`,  
        subject: `CANCELLATION: Your ${appointmentTime} Appointment with CTRL ALT ELITE`,
        html: `<p>Hello ${deletedApt.client.name}, <br/> Your appointment has successfully been cancelled. 
            <br/>Have a great day.</p>`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent', info.messageId);
      });
    })
    .then(() => {
      Appointment.findByIdAndRemove(id)
        .then((result) => {
          res.status(204).end();
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch(err => next(err));
  

  
});

module.exports = router;