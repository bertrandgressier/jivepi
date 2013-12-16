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
            ledManager.turnOn(1, 1, 0);
            break;
        }
    });
});





