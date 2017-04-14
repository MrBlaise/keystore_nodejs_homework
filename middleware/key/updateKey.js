var requireOption = require('../common').requireOption;
var fingerprint = require('ssh-fingerprint');

/**
 * Create or Update key
 * update if res.tpl.key exists, otherwise create it
 *  - if there is no name or email or key_text, set req.tpl.error
 *  - if everything is ok redirect to /keys/:id
 */
module.exports = function (objectRepository) {

  var keyModel = requireOption(objectRepository, 'keyModel');

  return function (req, res, next) {

    if (!req.body || !req.body.name || !req.body.email || !req.body.key_text) {
      res.tpl.error.push('Missing information');
      return next();
    }

    if (!res.tpl.key) {
      res.tpl.key = new keyModel();
    } else if (String(res.tpl.key.user_id) !== String(req.session.userid)) {
      res.tpl.error.push('Insufficient permissions');
      return next();
    }


    res.tpl.key.name = req.body.name;
    res.tpl.key.email = req.body.email;
    res.tpl.key.key_text = req.body.key_text;
    res.tpl.key.user_id = req.session.userid;
    res.tpl.key.fingerprint = fingerprint(req.body.key_text);

    res.tpl.key.save(function (err, result) {
      if(err) {
        return next(err);
      }
      return res.redirect('/keys');
    });
  };
};
