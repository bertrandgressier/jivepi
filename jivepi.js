var lib = require('./jivelib');
var ledManager = require('./ledManager');


function main() {

    try {
        lib.getLastActivity().then(function (type) {
            switch (type) {
            case 'COMMENT' :
            case 'REPLY':
                ledManager.turnOn(0, 1, 0);
                break;

            case 'ACCOUNT':
                ledManager.turnOn(1, 1, 0);
                break;

            case 'LIKE':
                ledManager.turnOn(1, 0, 0);
                break;
            case 'JOIN':
                ledManager.turnOn(1, 0, 1);
                break;
            case 'CREATE':
                ledManager.turnOn(0, 0, 1);
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


//add in your script launcher gpio-admin unexport <port> if you need to relaunch
ledManager.setup().then(
    function () {
        main();
    }, 
    function (error) {
        console.log(error);
    }
);
