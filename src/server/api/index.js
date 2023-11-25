const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const {getUserById}=require('../db/users');
const client = require('../db/client');
const volleyball = require('volleyball')
const { JWT_SECRET = 'neverTell'} = process.env;

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


// ROUTER: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// ROUTER: /api/characters
const charactersRouter = require('./character');
apiRouter.use('/characters', charactersRouter);

// ROUTER: /api/reviews
const reviewsRouter = require('./review');
apiRouter.use('/reviews', reviewsRouter);

const adminRouter = require('./admin');
apiRouter.use('/admin', adminRouter);

const commentsRouter = require('./comment');
apiRouter.use('/comments', commentsRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err)
})

module.exports = apiRouter;
