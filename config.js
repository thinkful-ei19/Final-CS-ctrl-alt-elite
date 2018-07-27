'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://schedulr.netlify.com',
  DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://user:password123@ds255930.mlab.com:55930/final-capstone',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: '7d'
};