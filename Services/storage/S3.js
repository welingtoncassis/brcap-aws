// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

module.exports = class S3 {

    constructor(config = {}) {
        this.options = {
            ...config,
            ...(
                config.endpoint
                && { endpoint: new AWS.Endpoint(config.endpoint) }
            )
        };
        this.s3 = new AWS.S3(this.options);
    }

    async get(bucket, key) {
        if (bucket === undefined || bucket === null || bucket === '') {
            throw new Error("bucket missing or in a invalid state.");
        }
        if (key === undefined || key === null || key === '') {
            throw new Error("key missing or in a invalid state.");
        }
        var params = {
            Bucket: bucket,
            Key: key,
            ResponseContentType: 'application/json'
        };
        const s3 = await this.s3.getObject(params).promise()
        const result = JSON.parse(s3.Body);
        return result
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

    upload(params, callback) {
        this.s3.upload(params, (err, data) => callback(err, data));
    }

    delete(bucket, pathFileName, callback) {
        const params = {
            Bucket: bucket,
            Key: pathFileName,
        };
        this.s3.deleteObject(params, (err, data) => callback(err, data));
    }

    listObjects(bucket, directory, callback) {
        this.s3.listObjectsV2({
            Bucket: bucket,
            Prefix: directory,
        }, callback);
    }
}