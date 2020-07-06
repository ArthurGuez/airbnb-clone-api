const express = require('express');
const cors = require('cors');

const router = require('./routes');

const server = express();

server.use('/api', router);
server.use(
  cors({
    origin: 'http://localhost/',
    methods: ['GET', 'POST', 'PATCH'],
  })
);

module.exports = server;
