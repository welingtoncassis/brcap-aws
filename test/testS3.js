var BRCAPAWS = require('../index.js');

BRCAPAWS.S3_Get('bucket', 'file', function(err, data){
    if (err){
        console.log(err);
    }else{
        console.log(data);
    }
});
