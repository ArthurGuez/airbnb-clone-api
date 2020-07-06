const server = require('./server');

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`CORS-enabled web server running on port ${PORT}.`);
});
