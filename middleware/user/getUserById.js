var requireOption = require('../common').requireOption;
var ObjectId = require('mongodb').ObjectId;

/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {

    if (!req.params.userid) {
      return next();
    }

    userModel.findOne({_id: ObjectId(req.params.userid)}, function (err, result) {
      if (err) {
        return next(err);
      }

      res.tpl.user = result;

      return next();
    });

  };

};
