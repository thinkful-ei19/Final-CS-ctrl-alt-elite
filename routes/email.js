'use strict';

require('dotenv').config();
const nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

let mailOptions = {
  from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
  to: 'julieskim160@gmail.com',  
  subject: 'Appointment Reminder',
  text: ''

};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent', info.messageId);
});



