var SNS = require('./Services/notifications/SNS');
var SQS = require('./Services/notifications/SQS');
var Redis = require('./Services/cache/Redis');
var S3 = require('./Services/storage/S3');
var Dynamo = require('./Services/DataBase/DynamoDB');

exports.SNS_Post = function (snsURL, payload, subject, region, callback) {
    SNS_Post = new SNS(region);

    SNS_Post.post(snsURL, payload, subject, function (err, data) {
        callback(err, data);
    });
}
exports.SQS_Get = function (queueURL, region, callback) {
    SQS_Get = new SQS(region);

    SQS_Get.get(queueURL, function (err, data) {
        callback(err, data);
    });
}

exports.SQS_Delete = function (queueURL, receiptHandle, region, callback) {

    SQS_Delete = new SQS(region);

    SQS_Delete.delete(queueURL, receiptHandle, function (err, data) {
        callback(err, data);
    });
}

exports.Redis_Get = function (key, host, port, callback) {

    Redis_Get = new Redis(host, port);

    Redis_Get.get(key, function (err, data) {
        callback(err, data);
    });
}

exports.Redis_Post = function (key, value, ttl, host, port, callback) {

    Redis_Post = new Redis(host, port);

    Redis_Post.post(key, value, ttl, function (err, data) {
        callback(err, data);
    });
}

exports.Redis_Delete = function (key, host, port, callback) {

    Redis_Delete = new Redis(host, port);

    Redis_Delete.delete(key, function (err, data) {
        callback(err, data);
    });
}

exports.S3_Get = function (bucket, key, callback) {

    S3_Get = new S3();

    S3_Get.get(bucket, key, function (err, data) {
        callback(err, data);
    });
}

exports.Dynamo_Delete = function (tableName, keyName, key, callback) {

    Dynamo_Delete = new Dynamo();

    Dynamo_Delete.delete(tableName, keyName, key, function (err, data) {
        callback(err, data);
    });
}

exports.Dynamo_Get = function (tableName, nameKey, key, callback) {

    Dynamo_Get = new Dynamo();

    Dynamo_Get.get(tableName, nameKey, key, function (err, data) {
        callback(err, data);
    });
}

exports.Dynamo_Put = function (tableName, item, callback) {

    Dynamo_Put = new Dynamo();

    Dynamo_Put.put(tableName, item, function (err, data) {
        callback(err, data);
    });
}