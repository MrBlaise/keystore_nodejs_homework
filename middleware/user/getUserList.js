var requireOption = require('../common').requireOption;

/**
 * Load all the users
 * and put them on res.tpl.users
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {
    userModel.find({}, function (err, results) {
      if (err) {
        return next(err);
      }
      res.tpl.users = results;
      return next();
    });
  };
};
