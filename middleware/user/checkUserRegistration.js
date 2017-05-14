var requireOption = require('../common').requireOption;

/**
 * Check if the email address is already registered, if not
 * create the user
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {

    if (!req.body || !req.body.email || !req.body.password || !req.body.password2) {
      return next();
    }

    userModel.findOne({
      email: req.body.email
    }, function (err, result) {

      if ((err) || (result)) {
        res.tpl.error.push('This email address is already taken!');
        return next();
      }

      if(req.body.password !== req.body.password2) {
        res.tpl.error.push('The two passwords don\'t match!');
        return next();
      }

      //create user
      var newUser = new userModel();
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.save(function (err) {
        if(!err) {
          return res.redirect('/log-in');
        } else {
          next(err);
        }
      });
    });
  };

};
