var requireOption = require('../common').requireOption;

/**
 * Get the key list and put the keys on res.tpl.keys
 */
module.exports = function (objectRepository) {

  var keyModel = requireOption(objectRepository, 'keyModel');

  // Only return the keys for this user
  return function (req, res, next) {
    keyModel.find({
      user_id: req.session.userid
    }, function (err, result) {
      if (err) {
        next(err);
      }
      res.tpl.keys = result;
      return next();
    });
  };

};
