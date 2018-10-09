var BRCAPAWS = require('../index.js');

BRCAPAWS.SQS_ListQueues('', 'sa-east-1', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});