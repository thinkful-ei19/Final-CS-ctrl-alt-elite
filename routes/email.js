'use strict';
const nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ctrl.alt.elite.acjj@gmail.com',
        pass: 'partypizza'
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

// let transporter = nodemailer.createTransport(transport[smtpConfig, defaults])

// let smtpConfig = {
//     host: 'smtp.example.com',
//     port: 465, //recommended port for gmail, 587 for SSL
//     secure: false, // upgrade later with STARTTLS
//     auth: {
//         user: 'ctrl.alt.elite.acjj@gmail.com',
//         pass: 'partypizza'
//     }
// };

let mailOptions = {
    from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
    to: 'julieskim160@gmail.com',  
    subject: 'Appointment Verification',
    text: 'Hello World'

};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent', info.messageId);
});



