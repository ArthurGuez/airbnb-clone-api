const express = require('express');
const cors = require('cors');

const router = require('./routes');
const db = require('./models/index');

const server = express();

// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
  console.log('Drop and Resync');
});

server.use(cors());

server.use('/api', router);

module.exports = server;
