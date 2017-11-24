var Emmiter = require('events').EventEmitter;
var util = require('util');

var ReviewProcess = function (args) {
    var callback;
    // make sure the app is valid
    this.ensureAppValid = function (app) {
        console.log('Enter: EnsureAppValid');
        if(app.isValid()){
            this.emit('validated', app);
        }else{
            this.emit('invalid', app.validationMessage())
        }
        console.log('Exit: ensureAppValid');
    };

    // find the next mission
    this.findNextMission = function (app) {
        console.log('Enter: findNextMission');
        app.mission = {
            commander : null,
            pilot : null,
            MAVPilot : null,
            passengers : []
        };
        this.emit('mission-selected', app);
        console.log('Exit: findNextMission');
    };

    // make sure role selected is available
    this.roleIsAvailable = function (app) {
        //we have no concept of role selection just yet
        //TODO: what about a role? Need more info
        console.log('Enter: roleIsAvailable');
        this.emit('role-available', app);
        console.log('Exit: roleIsAvailable');
    };

    // make sure height/weight/age is right for role
    this.ensureRoleCompatible = function (app) {
        //TODO: find out about roles and height/weight etc
        console.log('Enter: ensureRoleCompatible');
        this.emit('role-compatible', app);
        console.log('Exit: ensureRoleCompatible');
    };

    // accept the app with a message
    this.acceptApplication = function (app) {
        console.log('Enter: acceptApplication');
        callback(null, {
            success: true,
            message: 'welcome to the Mars program!'
        });
        console.log('Exit: acceptApplication');
    };

    // deny the app with a message
    this.denyApplication = function (message) {
        console.log('Enter: denyApplication');
        callback(null, {
           success: false,
           message: message
        });
        console.log('Exit: dennyApplication');
    };
    this.processApplication = function (app, next) {
        console.log('Enter: processApplication');
        callback = next;
        this.emit('application-received', app);
        console.log('Exit: processApplication');
    };

    //event path
    this.on('application-received', this.ensureAppValid);
    this.on('validated', this.findNextMission);
    this.on('mission-selected', this.roleIsAvailable);
    this.on('role-available', this.ensureRoleCompatible);
    this.on('role-compatible', this.acceptApplication);

    //sad path
    this.on('invalid', this.denyApplication);
};

util.inherits(ReviewProcess, Emmiter);
module.exports = ReviewProcess;