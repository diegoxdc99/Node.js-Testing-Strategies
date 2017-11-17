var _ = require('underscore')._;
var moment = require('moment');

var MembershipApplication = function(args){
    args || (args = {});
    _.extend(this, args);
    this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, 'days');

    this.expired = function () {
        return this.validUntil.isBefore(moment());
    }
    this.emailIsValid = function(){
        return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
    };
    this.heightIsValid = function(){
        return this.height && this.height > 60 && this.height < 75;
    };
    this.ageIsValid = function(){
        return this.age && this.age <100 && this.age > 15;
    };
    this.weightIsValid = function(){
        return this.weight && this.weight > 100 && this.weight < 300;
    };
    this.nameIsValid = function () {
        return this.first && this.last;
    }
    this.validationMessage = function () {
        if(this.isValid()){
            return 'application is valid';
        }else if(!this.emailIsValid()){
            return 'email is invalid';
        }else if(!this.ageIsValid()){
            return 'age is outside our limits of 15 and 100 years';
        }else if(!this.heightIsValid()){
            return 'height is outside our limits of 60 and 75 inches';
        }else if(!this.weightIsValid()){
            return 'weight is outside our limits of 100 and 300 pounds';
        }else if(!this.nameIsValid()){
            return 'first and last name is required';
        }else if(!this.expired()){
            return 'this application is expired';
        }
    }
    this.isValid = function(){
        return this.emailIsValid() &&
            this.heightIsValid() &&
            this.ageIsValid() &&
            this.weightIsValid() &&
            this.nameIsValid() &&
            !this.expired();
    };
};

module.exports = MembershipApplication;