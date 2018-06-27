'use strict';

const mongoose = require('mongoose');

const AppointmentsSchema = new mongoose.Schema({
  time: {type: Date, required: true}, // tested with this formmat - > 2018-06-11 13:00:00
  client: {type: Object},    
  notes: {type: String},
  thanked: {type: Boolean, default: false}
}); 

AppointmentsSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Appointment', AppointmentsSchema);
