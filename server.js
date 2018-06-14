'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const registerRouter = require('./routes/register');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users.route');
const appointmentsRouter = require('./routes/appointments.route');
const clientsRouter = require('./routes/clients.route');

const notify = require('./cron/notifications');

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);
  
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(express.static('public'));

app.use(express.json());

// Mount routers
app.use('/api', registerRouter);
app.use('/api', authRouter);

// Endpoints below are protected
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api', userRouter);
app.use('/api', appointmentsRouter);
app.use('/api', clientsRouter);

app.use(passport.authenticate('jwt', {session: false, failWithError: true}));

notify();

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
