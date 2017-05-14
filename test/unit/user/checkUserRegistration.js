// run tests with npm test

var expect = require('chai').expect;
var getUserRegistrationMW = require('../../../middleware/user/checkUserRegistration');

describe('getUserRegistration middleware ', function () {

  describe('should call next when', function () {
    it('no post parameter is given', function (done) {
      var wasCalled = false;

      var fakeUserModel = {
        findOne: function (some, cb) {
          wasCalled = true;
          cb();
        }
      };

      getUserRegistrationMW({
        userModel: fakeUserModel
      })({}, {}, function (err) {
        expect(wasCalled).to.be.eql(false);
        expect(err).to.eql(undefined);
        done();
      });
    });

    it('no password parameter is given', function (done) {
      var req = {
        body: {
          email: 'email@email.hu'
        }
      };
      var wasCalled = false;

      var fakeUserModel = {
        findOne: function (some, cb) {
          wasCalled = true;
          cb();
        }
      };

      getUserRegistrationMW({
        userModel: fakeUserModel
      })(req, {}, function (err) {
        expect(wasCalled).to.be.eql(false);
        expect(err).to.eql(undefined);
        done();
      });
    });

    it('no email parameter is given', function (done) {
      var req = {
        body: {
          password: '12345678',
          password2: '12345678'
        }
      };
      var wasCalled = false;

      var fakeUserModel = {
        findOne: function (some, cb) {
          wasCalled = true;
          cb();
        }
      };

      getUserRegistrationMW({
        userModel: fakeUserModel
      })(req, {}, function (err) {
        expect(wasCalled).to.be.eql(false);
        expect(err).to.eql(undefined);
        done();
      });
    });

    it('no password verification is given', function (done) {
      var req = {
        body: {
          email: "email@email.hu",
          password: '12345678'
        }
      };
      var wasCalled = false;

      var fakeUserModel = {
        findOne: function (some, cb) {
          wasCalled = true;
          cb();
        }
      };

      getUserRegistrationMW({
        userModel: fakeUserModel
      })(req, {}, function (err) {
        expect(wasCalled).to.be.eql(false);
        expect(err).to.eql(undefined);
        done();
      });
    });

  });

  it('should register new user if everything is ok', function (done) {
    var req = {
      body: {
        password: '12345678',
        password2: '12345678',
        email: 'email@email.hu',
      }
    };

    var res = {
      redirect: function (redirect) {
        expect(redirect).to.eql('/log-in');
        done();
      }
    };


    var fakeUserModel = function () {
    };

    fakeUserModel.findOne = function (some, cb) {
      return cb(undefined, null);
    };

    fakeUserModel.prototype.save = function (cb) {
      return cb(undefined);
    };

    getUserRegistrationMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(true).to.eql(false);
      done();
    });
  });

  it('should return error when the two password don\'t match', function (done) {
    var req = {
      body: {
        password: '13245678',
        password2: '12345678',
        email: 'email@email.hu',
      }
    };

    var res = {
      tpl: {
        error : []
      }
    };

    var fakeUserModel = function () {
    };

    fakeUserModel.findOne = function (some, cb) {
      return cb(undefined, null);
    };

    getUserRegistrationMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error.length).to.be.above(0);
      expect(res.tpl.error[0]).to.be.eql('The two passwords don\'t match!');
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should return error when email already exists', function (done) {
    var req = {
      body: {
        password: '12345678',
        password2: '12345678',
        email: 'email@email.hu',
      }
    };

    var res = {
      tpl: {
        error :[]
      }
    };

    var user = {
        email: 'email@email.hu'
    }

    var fakeUserModel = function () {
    };

    fakeUserModel.findOne = function (some, cb) {
      return cb(undefined, user);
    };

    getUserRegistrationMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error.length).to.be.above(0);
      expect(res.tpl.error[0]).to.be.eql('This email address is already taken!');
      expect(err).to.eql(undefined);
      done();
    });
  });

   it('should return error on db error', function (done) {
    var req = {
      body: {
        password: '12345678',
        password2: '12345678',
        email: 'email@email.hu',
      }
    };

    var res = {
      tpl: {
        error :[]
      }
    };

    var fakeUserModel = function () {
    };

    fakeUserModel.findOne = function (some, cb) {
      return cb(undefined, true);
    };

    getUserRegistrationMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error.length).to.be.above(0);
      expect(err).to.eql(undefined);
      done();
    });
  });
});