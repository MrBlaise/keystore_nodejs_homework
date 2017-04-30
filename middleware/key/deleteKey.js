var requireOption = require('../common').requireOption;

/**
 * Delete the key object
 */
module.exports = function (objectRepository) {

  var keyModel = requireOption(objectRepository, 'keyModel');

  return function (req, res, next) {
    if (!res.tpl.key) {
      return next();
    }

    res.tpl.key.remove(function (err) {
      if(err) {
        return next(err);
      }
      return next()
    })
  };

};
