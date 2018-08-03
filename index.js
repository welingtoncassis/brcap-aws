var SNS = require('./Services/notifications/SNS');
var SQS = require('./Services/notifications/SQS');
var Redis = require('./Services/cache/Redis');
var S3 = require('./Services/storage/S3');
var Dynamo = require('./Services/DataBase/DynamoDB');

exports.SNS_Post = function (snsURL, payload, subject, region, callback) {
    
    new SNS(region).post(snsURL, payload, subject, function (err, data) {
        callback(err, data);
    });
}

exports.SQS_Get = function (queueURL, region, callback) {
  
    new SQS(region).get(queueURL, function (err, data) {
        callback(err, data);
    });
}

exports.SQS_Delete = function (queueURL, receiptHandle, region, callback) {

    new SQS(region).delete(queueURL, receiptHandle, function (err, data) {
        callback(err, data);
    });
}

exports.Redis_Get = function (key, host, port, callback) {

    new Redis(host, port).get(key, function (err, data) {
        callback(err, data);
    });
}

exports.Redis_Post = function (key, value, ttl, host, port, callback) {

    new Redis(host, port).post(key, value, ttl, function (err, data) {
        callback(err, data);
    });
}

exports.Redis_Delete = function (key, host, port, callback) {

    new Redis(host, port).delete(key, function (err, data) {
        callback(err, data);
    });
}

exports.S3_Get = function (bucket, key, callback) {

    new S3().get(bucket, key, function (err, data) {
        callback(err, data);
    });
}

exports.Dynamo_Delete = function (tableName, keyName, key,region, callback) {

    new Dynamo(region).delete(tableName, keyName, key, function (err, data) {
        callback(err, data);
    });
}

exports.Dynamo_Get = function (tableName, nameKey, key,region, callback) {

    new Dynamo(region).get(tableName, nameKey, key, function (err, data) {
        callback(err, data);
    });
}

exports.Dynamo_Put = function (tableName, item, region, callback) {

    new Dynamo(region).put(tableName, item, function (err, data) {
        callback(err, data);
    });
}

exports.Dynamo_getSortKey = function (tableName, keys, region, callback) {
    
    new Dynamo(region).getSortKey(tableName, keys, function (err, data) {
        callback(err, data);
    });
}

exports.Dynamo_Query = function (object, region, callback) {
        
    new Dynamo(region).query(object, function (err, data) {
        callback(err, data);
    });
}

exports.Dynamo_update = function (object, region, callback) {
        
    new Dynamo(region).update(object, function (err, data) {
        callback(err, data);
    });
}