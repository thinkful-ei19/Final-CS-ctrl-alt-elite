const cron = require('node-cron');
const Appointment = require('../models/appointment');
const moment = require('moment');
const nodemailer = require('nodemailer');

function thanks() {
    cron.schedule('0 9 * * *', function(){
    
    let needsNotification = [];

    Appointment.find({thanked:false}) 
        .then((result) => {
            result.forEach((apt) => {         
                const dayAgo = moment().to(apt.time)
                if(dayAgo === "a day ago") {
                  needsNotification.push(apt);
                  Appointment.findByIdAndUpdate(apt.id,{ 
                    $set: {thanked: true}
                  },{new:true})
                  .then(apt=> console.log(apt))
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
                subject: `Thank You!`,
                html: `<p>Hi there, ${apt.client.name}, <br/><br/>We just wanted to say thanks for using our services! </p>`
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

module.exports = thanks;