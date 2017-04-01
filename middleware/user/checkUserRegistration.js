var requireOption = require('../common').requireOption;

/**
 * Check if the email address is already registered, if not
 * create the user
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {
    return next();
  };

};
