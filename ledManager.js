/**
 * Created by bertrand on 17/12/13.
 */

var gpio = require('./pi-gpio-q');
var q = require('q');

var config = require('./config');

if (config.mockLed) {
    gpio = require('./pi-gpio-mock');
}

var redpin = 16;
var greenpin = 18;
var bluepin = 22;

exports.turnOn = function (red, green, blue) {

    var promises = [];
    if (red) {
        promises.push(gpio.open(redpin, 'out'));
    }
    if (green) {
        promises.push(gpio.open(greenpin, 'out'));
    }
    if (blue) {
        promises.push(gpio.open(bluepin, 'out'));
    }

    q.all(promises).then(function () {

        if (red) {
            gpio.write(redpin, false);
        }
        if (green) {
            gpio.write(greenpin, false);
        }
        if (blue) {
            gpio.write(bluepin, false);
        }

        //reset
        setTimeout(function () {
            if (red) {
                gpio.write(redpin, true);
            }
            if (green) {
                gpio.write(greenpin, true);
            }
            if (blue) {
                gpio.write(bluepin, true);
            }

            closeAll(red, green, blue);
        }, 2000);


    }, function () {
        //error
        return closeAll(red, green, blue);
    });
};

function closeAll(red, green, blue) {
    var promises = [];
    if (red) {
        promises.push(gpio.close(redpin));
    }
    if (green) {
        promises.push(gpio.close(greenpin));
    }
    if (blue) {
        promises.push(gpio.close(bluepin));
    }

    return q.all(promises);
}



