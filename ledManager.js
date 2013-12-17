/**
 * Created by bertrand on 17/12/13.
 */

var gpio = require('./pi-gpio-q');
var q = require('q');

var config = require('./config');

if (config.mockLed) {
    gpio = require('./pi-gpio-mock');
}

exports.turnOn = function (red, green, blue) {

    return q.all([
            gpio.open(config.led.redpin, 'out'),
            gpio.open(config.led.greenpin, 'out'),
            gpio.open(config.led.bluepin, 'out')
        ]).then(function () {

            return ledRGB(red, green, blue).then(function () {
                //reset

                var defered = q.defer();

                setTimeout(function () {
                    ledRGB(false, false, false).then(function () {
                        closeAll().then(function () {
                            defered.resolve();
                        });
                    });

                }, 2000);

                return defered.promise;
            });

        }, function (error) {
            //error
            console.log('error in led ' + error);
            return closeAll();

        });
};

function ledRGB(red, green, blue) {
    return q.all([
        gpio.write(config.led.redpin, !red),
        gpio.write(config.led.greenpin, !green),
        gpio.write(config.led.bluepin, !blue)]);
}

function closeAll() {

    return q.all([
        gpio.close(config.led.redpin),
        gpio.close(config.led.greenpin),
        gpio.close(config.led.bluepin)
    ]);
}



