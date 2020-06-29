const express = require('express');
const router = require('./routes');

const server = express();

server.use('/api', router);

module.exports = server;
