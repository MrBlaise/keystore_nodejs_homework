var authWatcherMW = require('../middleware/generic/authWatcher');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
var renderMW = require('../middleware/generic/render');

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
    renderMW(objectRepository, 'login')
  );

  /**
   * Sign-up page
   */
  app.use('/sign-up',
    inverseAuthMW(objectRepository),
    checkUserRegistrationMW(objectRepository),
    renderMW(objectRepository, 'signup')
  );

};
