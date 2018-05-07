var BRCAPAWS = require('../index.js');


BRCAPAWS.Redis_Get('key', 'redis_host', 'port', function(err, data){
    if (err){
        console.log(err);
    }else{
        console.log(data);
    }
});


BRCAPAWS.Redis_Post('key', 'value', 'ttl', 'redis_host', 'port', function(err, data){
    if (err){
        console.log(err);
    }else{
        console.log(data);
    }
});


BRCAPAWS.Redis_Delete('key', 'redis_host', 'port', function(err, data){
    if (err){
        console.log(err);
    }else{
        console.log(data);
    }
});

