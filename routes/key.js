var authMW = require('../middleware/generic/auth');

var getKeyListMW = require('../middleware/key/getKeyList');
var getKeyByIdMW = require('../middleware/key/getKeyById');
var updateKeyMW = require('../middleware/key/updateKey');
var deleteKeyMW = require('../middleware/key/deleteKey');

var renderMW = require('../middleware/generic/render');

var keyModel = require('../models/key');

module.exports = function (app) {
  var objectRepository = {
    keyModel: keyModel
  };

  /**
   * Edit the key details
   */
  app.use('/keys/:keyid/edit',
    authMW(objectRepository),
    getKeyByIdMW(objectRepository),
    updateKeyMW(objectRepository),
    renderMW(objectRepository, 'edit_key')
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
   * Create a key
   */
  app.use('/keys/new',
    authMW(objectRepository),
    updateKeyMW(objectRepository),
    renderMW(objectRepository, 'edit_key')
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
