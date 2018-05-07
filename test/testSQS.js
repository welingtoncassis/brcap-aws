var BRCAPAWS = require('../index.js');

BRCAPAWS.SQS_Get('SQS_URL', 'region', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        if (data.code == 200) {
            console.log(data.body.id);
            BRCAPAWS.SQS_Delete('SQS_URL', data.receiptHandle, 'region', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Mensagem apagada com sucesso");
                }
            });
        } else {
            console.log(data.message);
        }
    }
});