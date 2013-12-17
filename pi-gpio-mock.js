var q = require('q');


exports.open = function (pinNumber, direction) {

    console.log('OPEN ' + pinNumber + ' ' + direction);

    return q.when();
};

exports.close = function (pinNumber) {

    console.log('CLOSE ' + pinNumber);

    return q.when();
};

exports.write = function (pinNumber, value) {

    console.log('WRITE ' + pinNumber + ' ' + value);

    return q.when();
};