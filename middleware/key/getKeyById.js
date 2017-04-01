var requireOption = require('../common').requireOption;

/**
 * Get the key from the :keyid param
 *  - if there is no such key, redirect to /keys
 *  - if there is one, put it on res.tpl.key
 */
module.exports = function (objectRepository) {

  var keyModel = requireOption(objectRepository, 'keyModel');

  return function (req, res, next) {

    keyModel.findOne({
      id: req.param.keyid
    }, function (err, result) {
      if ((err) || (!result)) {
        return req.redirect('/keys');
      }
      res.tpl.key = result;
      return next();
    });
  };

};
