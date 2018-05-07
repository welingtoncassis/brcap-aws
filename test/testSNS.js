var BRCAPAWS = require('../index.js');

var payload = {id: 'teste'};

BRCAPAWS.SNS_Post('arn_sns', payload, 'Teste de SNS', 'region', function(err, data){
    if (err){
        console.log(err);
    }else{
        console.log(data);
    }
});
