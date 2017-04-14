var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Key = db.model('Key', {
  name: String,
  email: String,
  key_text: String,
  fingerprint: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Key;