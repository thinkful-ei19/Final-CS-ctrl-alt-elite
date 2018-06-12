'use strict';
require("dotenv").config();
const nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
  })

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     xoauth2: xoauth2.createXOAuth2Generator({
//         user: 'ctrl.alt.elite.acjj@gmail.com',
//         clientId: '873311789311-pdpjljmhka27tbuems1rbobl27b6ahle.apps.googleusercontent.com',
//         clientSecret:'pRSZ2Z50Nv1Az2rUMlFnpKIh',
//         refreshToken: ''
//     })
//   }  
// })

let mailOptions = {
    from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
    to: 'julieskim160@gmail.com',  
    subject: 'Appointment Verification',
    text: 'Hello World take2'

};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent', info.messageId);
});



