const path = require('path');

module.exports = {
  createFixtureRoutes: (fixtureURI) => {
    const fixturePath = path.resolve(`db/seeds`, fixtureURI);

    const Fixture = require(fixturePath);
    return Fixture();
  },
};
