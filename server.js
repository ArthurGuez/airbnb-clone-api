if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const router = require('./routes');

const { errorLogger, errorHandler } = require('./middlewares');

const server = express();

const NotFoundError = require('./helpers/errors/not_found_error');

server.use(logger('tiny'));
server.use(cors());

server.use('/api', router);
server.use('*', (req, res, next) => {
  throw new NotFoundError('Ressource introuvable', 'Vous vous êtes trompé de route !');
});

server.use(errorLogger);
server.use(errorHandler);

module.exports = server;
