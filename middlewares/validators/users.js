const _ = require('lodash');

module.exports = {
  firstName: (first_name, res) => {
    if (_.isNil(first_name)) {
      res.status(400).json({
        error: "Le champ first_name n'est pas renseigné",
      });
      return;
    }
  },
};
