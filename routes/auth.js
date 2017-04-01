var authWatcherMW = require('../middleware/generic/authWatcher');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
var renderMW = require('../middleware/generic/render');
var logOutMW = require('../middleware/generic/logout');

var userModel = require('../models/user');

module.exports = function (app) {

  var objectRepository = {
    userModel: userModel
  };

  /**
   * Main page
   */
  app.get('/',
    authWatcherMW(objectRepository)
  );

  /**
   * Login page
   */
  app.use('/log-in',
    inverseAuthMW(objectRepository),
    checkUserLoginMW(objectRepository),
    renderMW(objectRepository, 'log-in')
  );

  /**
   * Log out
   */
  app.use('/log-out',
    logOutMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/log-in');
    }
  );


  /**
   * Sign-up page
   */
  app.use('/sign-up',
    inverseAuthMW(objectRepository),
    checkUserRegistrationMW(objectRepository),
    renderMW(objectRepository, 'sign-up')
  );

};
