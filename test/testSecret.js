var BRCAPAWS = require('../index.js');

const properties = {
    'id' : 1,
    'valor' : 'teste'
}

BRCAPAWS.Kms_encrypt('7b4244f7-664e-4b52-812d-f23200d47ded', 'sa-east-1', JSON.stringify(properties), function(err, data){
    
    console.log('cifrando: ',JSON.stringify(properties));   
    
    if (err){
        console.log(err);
    }else{        
        BRCAPAWS.Kms_decrypt(data.CiphertextBlob, 'sa-east-1', function(err, dataDecripted){
            if (err){
                console.log(err);
            }else{
                console.log(dataDecripted);
            }
        });
    }
});