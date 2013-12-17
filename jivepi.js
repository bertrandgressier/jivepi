var lib = require('./jivelib');
var schedule = require('node-schedule');
var ledManager = require('./ledManager');

var rule = new schedule.RecurrenceRule();
//rule.second = [0, 15, 30, 45];
rule.second = [0, 10, 20, 30, 40, 50];

schedule.scheduleJob(rule, function () {
    lib.getLastActivity().then(function (type) {
        switch (type) {
        case 'COMMENT' :
        case 'REPLY':
            ledManager.turnOn(1, 1, 0);
            break;

        case 'ACCOUNT':
            ledManager.turnOn(1, 0, 1);
            break;

        case 'LIKE':
            ledManager.turnOn(1, 1, 0);
            break;
        case 'JOIN':
            ledManager.turnOn(0, 0, 1);
            break;
        case 'CREATE':
            ledManager.turnOn(0, 1, 0);
            break;
        case 'UNKNOWN':
            console.log('UNKNOWN type');
            break;
        }
    });
});







