var requireOption = require('../common').requireOption;

/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {
    return next();
  };

};
