'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ctrl.alt.elite.acjj@gmail.com',
    pass: 'partypizza'
  }  
})

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



