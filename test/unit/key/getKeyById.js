// run tests with npm test

var expect = require('chai').expect;
var getUserListMW = require('../../../middleware/key/getKeyById');
var ObjectId = require('mongodb').ObjectId;

describe('getKeyById middleware ', function () {

    it('should return the key', function(done) {
        var id = ObjectId();

        var req = {
            session: {
                userid: "userid1"  
            },
            params: {
                keyid: id
            }
        };
        
        var res = {
            tpl: {
                error : []
            }
        };

        var keyWithDifferentUserId = {
            _id : id,
            user_id: "userid1"
        }

        var fakeKeyModel = {
            findOne: function (some, cb) {
                var result = undefined;
                if (keyWithDifferentUserId.user_id === some.user_id) {
                    result = keyWithDifferentUserId;
                }
                cb(undefined, result)
            }
        };

        getUserListMW({
            keyModel: fakeKeyModel
            })(req, res, function (err) {
            expect(res.tpl.error.length).to.be.eql(0);
            expect(res.tpl.key).to.be.eql(keyWithDifferentUserId);
            expect(err).to.eql(undefined);
            done();
        });
    });

    describe('should redirect when ', function () {

        it('the user doesn\'t own the key', function (done) {

            var id = ObjectId();

            var req = {
                session: {
                    userid: "userid1"  
                },
                params: {
                    keyid: id
                }
            };
            
            var res = {
                redirect: function (redirect) {
                    expect(redirect).to.eql('/keys');
                    done();
                },
                tpl: {
                    error: []
                }
            };

            var keyWithDifferentUserId = {
                _id : id,
                user_id: "userid2"
            }

            var fakeKeyModel = {
                findOne: function (some, cb) {
                    var result = undefined;
                    if (keyWithDifferentUserId.user_id === some.user_id) {
                        result = keyWithDifferentUserId;
                    }
                    cb(undefined, result)
                }
            };

            getUserListMW({
                keyModel: fakeKeyModel
                })(req, res, function (err) {
                expect(res.tpl.error.length).to.be.eql(0);
                expect(res.tpl.key).to.be.eql(undefined);
                expect(err).to.eql(undefined);
                done();
            });
        });
    
    it('db error occurs', function (done) {

            var id = ObjectId();

            var req = {
                session: {
                    userid: "userid1"  
                },
                params: {
                    keyid: id
                }
            };
            
            var res = {
                redirect: function (redirect) {
                    expect(redirect).to.eql('/keys');
                    done();
                },
                tpl: {
                    error: []
                }
            };

            var fakeKeyModel = {
                findOne: function (some, cb) {
                    cb("BAJ VAN", undefined)
                }
            };

            getUserListMW({
                keyModel: fakeKeyModel
                })(req, res, function (err) {
                expect(res.tpl.error.length).to.be.eql(0);
                expect(res.tpl.key).to.be.eql(undefined);
                expect(err).to.eql(undefined);
                done();
            });
        });
    });
});