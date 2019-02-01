// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

var s3;

module.exports = class S3 {

    constructor() {
        this.s3 = new AWS.S3();
    }

    get(bucket, key, callback) {
        if (bucket === undefined || bucket === null || bucket === '') {
            callback("bucket missing or in a invalid state.", null);
        } else if (key === undefined || key === null || key === '') {
            callback("key missing or in a invalid state.", null);
        } else {
            var params = {
                Bucket: bucket,
                Key: key
            };
            this.s3.getObject(params, function (err, data) {
                callback(err, data);
            });
        }
    }

    put(bucket, key, param, callback) {
        const params = {
            Bucket: bucket,
            Key: key,
            Body: JSON.stringify(param)
        };
        this.s3.putObject(params, (err, data) => callback(err, data));
    }

    putObject(params, callback) {
        this.s3.putObject(params, (err, data) => callback(err, data));
    }

    delete(bucket, pathFileName, callback) {
        const params = {
            Bucket: bucket,
            Key: pathFileName,
        };
        this.s3.delete(params, (err, data) => callback(err, data));
    }
}