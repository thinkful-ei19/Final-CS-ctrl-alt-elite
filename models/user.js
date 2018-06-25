'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  appointments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'}],
  clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Client'}],
  created: {type: Date, default: Date.now()},
  options: {type: Object, default: {theme: 'light'}}
});

UserSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}; 

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', UserSchema);
