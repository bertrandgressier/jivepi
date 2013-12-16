var gpio = require('pi-gpio');
var q = require('q');


exports.open = function (pinNumber, direction) {

    var defer = q.defer();

    gpio.open(pinNumber, direction, function (error) {

        if (error) {
            defer.reject(error);
        }
        defer.resolve();
    });

    return defer.promise;
};

exports.close = function (pinNumber) {

    var defer = q.defer();

    gpio.close(pinNumber, function (error) {

        if (error) {
            defer.reject(error);
        }
        defer.resolve();
    });

    return defer.promise;
};

exports.write = function (pinNumber, value) {

    var defer = q.defer();

    gpio.write(pinNumber, value, function (error) {

        if (error) {
            defer.reject(error);
        }
        defer.resolve();
    });

    return defer.promise;
};