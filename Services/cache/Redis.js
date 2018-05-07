var RedisClient = require('redis');

var redis;

module.exports = class Redis {

    constructor(host, port) {
        redis = RedisClient.createClient(port, host);
    }

    get(key, callback) {

        if (key === undefined || key === null || key === '') {
            callback("key missing or in a invalid state.", null);
        }

        redis.get(key, function (err, reply) {
            callback(err, reply);
        });

        redis.quit();
    }

    post(key, value, ttl, callback) {

        if (key === undefined || key === null || key === '') {
            callback("key missing or in a invalid state.", null);
        } else if (value === undefined ||value === null || value === '') {
            callback("value missing or in a invalid state.", null);
        } else if (ttl === undefined || ttl === null || ttl === '') {
            callback("ttl missing or in a invalid state.", null);
        }
        
        if (ttl != null && ttl != undefined && ttl != '' && ttl > 0) {
            redis.set(key, value, 'EX', ttl, function (err, reply) {
                callback(err, reply);
            });
        } else {
            redis.set(key, value, function (err, reply) {
                callback(err, reply);
            });
        }

        redis.quit();
    }

    delete(key, callback) {

        if (key === undefined || key === null || key === '') {
            callback("key missing or in a invalid state.", null);
        }
        
        redis.del(key, function (err, reply) {
            callback(err, reply);
        });

        redis.quit();
    }
}