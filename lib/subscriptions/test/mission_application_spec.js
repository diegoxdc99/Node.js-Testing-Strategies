var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');

describe('The Review Process', function () {
    describe('Receiving a valid application', function () {
        var validApp;
        var decision;
        before(function (done) {
            validApp = new MembershipApplication({
                first: "Test",
                last: "User",
                email: "test@test.com",
                age: 30,
                height: 66,
                weight: 180
            });
            var review = new ReviewProcess();
            review.processApplication(validApp, function(err, result){
                decision = result;
                done();
            });
        });

        it('returns success', function () {
            assert(decision.success, decision.message);
        })
    });
    describe('Receiving a invalid application', function () {
        it('return email is invalid with a email invalid', function () {
            var app = new MembershipApplication({
                first: "Test",
                last: "User",
                email: "testtest.com",
                age: 30,
                height: 66,
                weight: 180
            });
            var review = new ReviewProcess();
            review.processApplication(app, function (err, result) {
                assert(!result.success && result.message == 'email is invalid', result.message);
            });
        });
    });
});