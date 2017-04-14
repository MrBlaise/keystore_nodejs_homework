var requireOption = require('../common').requireOption;
var ObjectId = require('mongodb').ObjectId;

/**
 * Get the key from the :keyid param
 *  - if there is no such key, redirect to /keys
 *  - if there is one, put it on res.tpl.key
 */
module.exports = function (objectRepository) {

  var keyModel = requireOption(objectRepository, 'keyModel');

  // Only return the key if this user owns it
  return function (req, res, next) {
    keyModel.findOne({
      _id : ObjectId(req.params.keyid),
      user_id: req.session.userid
    }, function (err, result) {
      if ((err) || (!result)) {
        return res.redirect('/keys');
      }
      res.tpl.key = result;
      return next();
    });
  };

};
