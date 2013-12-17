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

    return q.all([
            gpio.open(redpin, 'out'),
            gpio.open(greenpin, 'out'),
            gpio.open(bluepin, 'out')
        ]).then(function () {

            return ledRGB(red, green, blue).then(function () {
                //reset
                setTimeout(function () {
                    ledRGB(false, false, false).then(function () {
                        closeAll();
                    });

                }, 2000);
            });

        }, function (error) {
            //error
            console.log('error in led ' + error);
            return closeAll();

        });
};

function ledRGB(red, green, blue) {
    return q.all([
        gpio.write(redpin, !red),
        gpio.write(greenpin, !green),
        gpio.write(bluepin, !blue)]);
}

function closeAll() {

    return q.all([gpio.close(redpin),
        gpio.close(greenpin),
        gpio.close(bluepin)
    ]);
}



