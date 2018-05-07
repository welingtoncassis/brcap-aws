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
}