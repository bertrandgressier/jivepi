var lib = require('./jivelib');
var ledManager = require('./ledManager');


function main() {

    try {
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
    } catch (error) {
        console.log(error);
    }
    setTimeout(main, 10000);
};

main();







