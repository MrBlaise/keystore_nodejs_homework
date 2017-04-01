var requireOption = require('../common').requireOption;

/**
 * Create or Update key
 * update if res.tpl.task exists, otherwise create it
 *  - if there is no name or email or key_text, set tpl.error
 *  - if everything is ok redirect to /keys/:id
 */
module.exports = function (objectRepository) {

  var keyModel = requireOption(objectRepository, 'keyModel');

  return function (req, res, next) {
    return next();
  };

};
