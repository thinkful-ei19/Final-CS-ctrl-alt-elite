const cron = require('node-cron');
const Appointment = require('../models/appointment');
const moment = require('moment');
const nodemailer = require('nodemailer');

function notify() {
    cron.schedule('0 9 * * *', function(){
    console.log('running a task at 9:00 AM every day');
    
    let needsNotification = [];

    Appointment.find()
        .then((result) => {
            result.forEach((apt) => {         
                // 'in a day' for day before
                if (moment(apt.time).fromNow() === 'in 2 days' ) {
                    needsNotification.push(apt);
                }
            })
        })
        .then(() => {
            console.log(needsNotification)
            needsNotification.forEach((apt) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.GMAIL_USER,
                  pass: process.env.GMAIL_PASS
                }
              });

            const appointmentTime = moment(apt.time).format('MMMM Do YYYY, h:mm a');

              let mailOptions = {
                from: 'CTRL ALT ELITE <ctrl.alt.elite.acjj@gmail.com>',
                to: `${apt.client.email}`,  
                subject: `REMINDER: Your ${appointmentTime} Appointment with CTRL ALT ELITE`,
                html: `<p>Hi ${apt.client.name}, <br/> <br/> This is a friendly reminder that your upcoming appointment is at ${apt.time}. <br/>Thank you for scheduling with us.</p>`
              };
            
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Message sent', info.messageId);
              });
            })

        })
        .catch(err => console.error(err))
    
 });
}

module.exports = notify;
