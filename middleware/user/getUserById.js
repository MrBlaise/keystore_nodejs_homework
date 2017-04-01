var requireOption = require('../common').requireOption;

/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {

    if (!req.param.userid) {
      return next();
    }

    userModel.findOne({id: req.param.userid}, function (err, result) {
      if (err) {
        return next(err);
      }

      res.tpl.user = result;

      return next();
    });

  };

};
