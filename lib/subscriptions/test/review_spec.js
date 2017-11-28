var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');
var sinon = require('sinon');

describe('The Review Process', function () {
    describe('Receiving a valid application', function () {
        var decision;
        var validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180
        });

        var review = new ReviewProcess();
        var validationSpy = sinon.spy();
        var missionSpy = sinon.spy();
        var roleAvailableSpy = sinon.spy();
        var roleCompatibleSpy = sinon.spy();

        before(function (done) {
            review.on('validated', validationSpy);
            review.on('mission-selected', missionSpy);
            review.on('role-available', roleAvailableSpy);
            review.on('role-compatible', roleCompatibleSpy);
            review.processApplication(validApp, function(err, result){
                decision = result;
                done();
            });
        });
        it('returns success', function () {
            assert(decision.success, decision.message);
        });
        it('ensures the application is valid', function () {
            assert(validationSpy.called);
        });
        it('select a mission', function () {
            assert(missionSpy.called);
        });
        it('ensure a role exists', function () {
            assert(roleAvailableSpy.called);
        });
        it('ensure role compatibility', function () {
            assert(roleCompatibleSpy.called);
        });
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