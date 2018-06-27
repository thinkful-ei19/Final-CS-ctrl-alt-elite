'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://user:password123@ds255930.mlab.com:55930/final-capstone',
  //TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || 'mongodb://localhost/final-capstone',    
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: '7d'
};