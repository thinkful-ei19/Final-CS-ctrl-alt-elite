'use strict';

const mongoose = require('mongoose');

const AppointmentsSchema = new mongoose.Schema({
  time: {type: Date, required: true}, // tested with this formmat - > 2018-06-11 13:00:00
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},    
  notes: {type: String}
}); 

AppointmentsSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Appointment', AppointmentsSchema);
