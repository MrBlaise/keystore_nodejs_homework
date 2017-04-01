var requireOption = require('../common').requireOption;

/**
 * Load all the users
 * and put them on res.tpl.users
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {
    next();
  };

};
