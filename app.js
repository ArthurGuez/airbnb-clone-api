const server = require('./server');

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
