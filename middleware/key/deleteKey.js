var requireOption = require('../common').requireOption;

/**
 * Delete the key object
 */
module.exports = function (objectRepository) {

  var keyModel = requireOption(objectRepository, 'keyModel');

  return function (req, res, next) {
    return next();
  };

};
