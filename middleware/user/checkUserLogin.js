var requireOption = require('../common').requireOption;

/**
 * Loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository,'userModel');

  return function (req, res, next) {

    if (!req.body || !req.body.email || !req.body.password) {
      return next();
    }

    // Find the user, if we have an error don't tell the user what was the problem
    // Because it would help a brute force attack
    userModel.findOne({
      email: req.body.email
    }, function (err, result) {
      if ((err) || (!result)) {
        res.tpl.error.push('Incorrect login details, please recheck!');
        return next();
      }
      if (result.password !== req.body.password) {
        res.tpl.error.push('Incorrect login details, please recheck!');
        return next();
      }

      req.session.userid = result.id;

      return res.redirect('/');
    });
  };

};
