const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const client = require('../db/client');
const volleyball = require('volleyball')
apiRouter.use(volleyball)

apiRouter.get('/health', async (req, res, next) => {
  try {
    const uptime = process.uptime();
    const {rows: [dbConnection]} = await client.query('SELECT NOW();');
    const currentTime = new Date();
    const lastRestart = new Intl.DateTimeFormat('en', {timeStyle: 'long', dateStyle: 'long', timeZone: "America/Los_Angeles"}).format(currentTime - (uptime * 1000));
    res.send({message: 'healthy', uptime, dbConnection, currentTime, lastRestart});
  } catch (err) {
    next(err);
  }
});

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith('REPLACE_ME')) {
    // TODO - Get JUST the token out of 'auth'
    const token = 'REPLACE_ME';
    
    try {
      const parsedToken = 'REPLACE_ME';
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'

    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});
// ROUTER: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// ROUTER: /api/characters
const charactersRouter = require('./character');
apiRouter.use('/characters', charactersRouter);

// ROUTER: /api/reviews
const reviewsRouter = require('./review');
apiRouter.use('/reviews', reviewsRouter);

apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

module.exports = apiRouter;