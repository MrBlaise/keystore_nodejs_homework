var authMW = require('../middleware/generic/auth');

var getKeyListMW = require('../middleware/key/getKeyList');
var getKeyByIdMW = require('../middleware/key/getKeyById');
var updateKeyMW = require('../middleware/key/updateKey');
var deleteKeyMW = require('../middleware/key/deleteKey');

var renderMW = require('../middleware/generic/render');

var keyModel = require('../models/key');
var userModel = require('../models/user');

module.exports = function (app) {
  var objectRepository = {
    keyModel: keyModel,
    userModel: userModel
  };

  /**
   * Edit the key details
   */
  app.get('/keys/:keyid/edit',
    authMW(objectRepository),
    getKeyByIdMW(objectRepository),
    renderMW(objectRepository, 'editkey')
  );

  /**
   * Edit the key details
   */
  app.post('/keys/:keyid/edit',
    authMW(objectRepository),
    getKeyByIdMW(objectRepository),
    updateKeyMW(objectRepository)
  );

  /**
   * Delete key (will redirect to /keys after finish)
   */
  app.use('/keys/:keyid/delete',
    authMW(objectRepository),
    getKeyByIdMW(objectRepository),
    deleteKeyMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/keys');
    }
  );

  /**
   * Create a key GET
   */
  app.get('/keys/new',
    authMW(objectRepository),
    renderMW(objectRepository, 'editkey')
  );

  /**
   * Create a key POST
   */
  app.post('/keys/new',
    authMW(objectRepository),
    updateKeyMW(objectRepository)
  );

  /**
   * Redirect to keys edit page
   */
  app.get('/keys/:keyid',
    authMW(objectRepository),
    getKeyByIdMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/keys/' + req.params.keyid + '/edit');
    });

  /**
   * List all keys
   */
  app.use('/keys',
    authMW(objectRepository),
    getKeyListMW(objectRepository),
    renderMW(objectRepository, 'keys')
  );

};
