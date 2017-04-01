/**
 * User model (mock)
 * @constructor
 */
var User = function () {
};

/**
 * An instance
 * @type {{id: string, name: string, email: string, pass: string}}
 */
var UserInstanceMock = {
  id: '3fdd798e-21b7-4917-946c-fa154cc594d7',
  name: 'Gipsz Jakab',
  email: 'gipsz@jakab.hu',
  password: '12345678',
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
User.findOne = function (criteria, cb) {

  //returns 1 mocked item
  return cb(null, UserInstanceMock);
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
User.find = function (criteria, cb) {

  //returns 3 mocked item
  return cb(null, [UserInstanceMock, UserInstanceMock, UserInstanceMock]);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
User.prototype.save = function (cb) {
  return cb(null, this);
};

module.exports = User;
