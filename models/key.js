var fingerprint = require('ssh-fingerprint');

/**
 * Key model (mock)
 * @constructor
 */
var Key = function () {
};

var example_key_text = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQC8oMEkeBtvpSt0cbtefFS1xoiU3zyfkXTAhKZCAsMn00qisHV4Oq8FgboOTVJExZ+8pjt" +
  "HYoNDcFhba2edwRb9ey0tMtoxPPTYKiyVsBwTQlu6VYm9g3IAzEeSoIXvr+BuGpGfiKccJj3txCqR/wvlSn2tYtVC4TVnfbTPfUrcoQ== mk@mk3";

/**
 * An instance
 * @type {{id: string, user_id: string, name: string, email: string, key_text: string}}
 */
var KeyInstanceMock = {
  id: '430a0b93-3c57-48c9-8f7f-e86332d5756d',
  user_id: '3fdd798e-21b7-4917-946c-fa154cc594d7',
  name: 'Key name',
  email: 'valaki@valami.hu',
  key_text: example_key_text,
  fingerprint: (function () {
    return fingerprint(example_key_text)
  })(),
  remove: function (cb) {
    return cb(null);
  },
  save: function (cb) {
    return cb(null, this);
  }
};

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Key.findOne = function (criteria, cb) {

  //returns 1 mocked item
  return cb(null, KeyInstanceMock);
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Key.find = function (criteria, cb) {

  //returns 3 mocked item
  return cb(null, [KeyInstanceMock, KeyInstanceMock, KeyInstanceMock]);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
Key.prototype.save = function (cb) {
  return cb(null, this);
};

/**
 * Delete an object
 * @param cb
 * @returns {*}
 */
Key.prototype.remove = function (cb) {
  return cb(null);
};

module.exports = Key;
