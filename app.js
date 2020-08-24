const server = require('./server');
// const db = require('./models/index');

// db.sequelize.sync().then(() => {
//   console.log('Drop and Resync');
// });

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`CORS-enabled web server running on port ${PORT}.`);
});
