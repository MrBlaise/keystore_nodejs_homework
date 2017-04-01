var requireOption = require('../common').requireOption;

/**
 * Get the key list and put the keys on res.tpl.keys
 */
module.exports = function (objectRepository) {

  var keyModel = requireOption(objectRepository, 'keyModel');

  return function (req, res, next) {
    return next();
  };

};
