var assert = require('assert');
var MembershipApplication = new require('../models/membership_application');

describe('Membership application requirements', function(){
    var validApp;

    before(function(){
        //Arrange the data here
        validApp = new MembershipApplication({
            first : "test",
            last : "user",
            email : "test@test.com",
            age : 30,
            height : 66,
            weight : 180
        });
    });

    describe('application valid if...', function(){
        it('all validators successful', function(){
            assert(validApp.isValid(), 'Not valid :(');
        });
        // it('email is 4 or more char and contains an @', function(){
        //     assert(validApp.emailIsValid(), 'email not valid');
        // });
        // it('height is between 60 and 75 inches', function(){
        //     assert(validApp.heightIsValid(), 'height not valid');
        // });
        // it('age is between 15 and 100',function () {
        //     assert(validApp.ageIsValid(), 'age not valid');
        // });
        // it('weight is between 100 and 300', function () {
        //     assert(validApp.weightIsValid(), 'weight not valid');
        // });
        // it('firs and last name are provided',function () {
        //     assert(validApp.nameIsValid(), 'name not valid');
        // });
    });
    
    describe('application invalid if...', function () {
        it('email is 4 characters or less',function () {
            var app = new MembershipApplication({email: "dd"});
            assert(!app.emailIsValid());
        });
        it('email does not contain an @',function () {
            var app = new MembershipApplication({email: "diegodonthaveat.diego.com"});
            assert(!app.emailIsValid());
        });
        it('email is omitted',function () {
            var app = new MembershipApplication();
            assert(!app.emailIsValid());
        });
        it('height is less than 60 inches', function () {
            var app = new MembershipApplication({height: 59});
            assert(!app.heightIsValid());
        });
        it('height is more than 75 inches', function () {
            var app = new MembershipApplication({height: 76});
            assert(!app.heightIsValid());
        });
        it('height is omitted', function () {
            var app = new MembershipApplication();
            assert(!app.heightIsValid());
        });
        it('age is less than 15', function () {
            var app = new MembershipApplication({age: 14});
            assert(!app.ageIsValid());
        });
        it('age is more than 100', function () {
            var app = new MembershipApplication({age: 101});
            assert(!app.ageIsValid());
        });
        it('age is omitted', function () {
            var app = new MembershipApplication();
            assert(!app.ageIsValid());
        });
        it('weight is less than 100', function () {
            var app = new MembershipApplication({weight: 99});
            assert(!app.weightIsValid());
        });
        it('weight is more than 300', function () {
            var app = new MembershipApplication({weight: 301});
            assert(!app.weightIsValid());
        });
        it('weight is omitted', function () {
            var app = new MembershipApplication();
            assert(!app.weightIsValid());
        });
        it('first is omitted', function () {
            var app = new MembershipApplication({last: 'last'});
            assert(!app.nameIsValid());
        });
        it('last is omitted', function () {
            var app = new MembershipApplication({first: 'first'});
            assert(!app.nameIsValid());
        });
        it('first and last are omitted', function () {
            var app = new MembershipApplication();
            assert(!app.nameIsValid());
        });
    });
});