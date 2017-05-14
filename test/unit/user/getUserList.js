// run tests with npm test

var expect = require('chai').expect;
var getUserListMW = require('../../../middleware/user/getUserList');

describe('getUserList middleware ', function () {

  it('should return users', function (done) {
    var req = {};
    var res = {
      tpl: {}
    };
    var fakeUserModel = {
      find: function (some, cb) {
        cb(undefined, ['geza', 'laci'])
      }
    };

    getUserListMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.users).to.eql(['geza', 'laci']);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should return error when db returns error', function (done) {
    var fakeUserModel = {
      find: function (some, cb) {
        cb('BAJ VAN!', undefined)
      }
    };

    getUserListMW({
      userModel: fakeUserModel
    })({}, {}, function (err) {
      expect(err).to.eql('BAJ VAN!');
      done();
    });
  });
});