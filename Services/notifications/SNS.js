// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

var sns;

module.exports = class SNS {
    
    constructor(region) {
        AWS.config.update({ region: region });
        this.sns = new AWS.SNS({ apiVersion: '2012-11-05', httpOptions: { timeout: 25000 } });
    }

    post(snsURL, payload, subject, callback) {

        if (payload === undefined || payload === null || payload === '') {
            callback("payload missing or in a invalid state.", null);
        } else if (snsURL === undefined || snsURL === null || snsURL === '') {
            callback("snsURL missing or in a invalid state.", null);
        } else if (subject === undefined || subject === null || subject === '') {
            callback("subject missing or in a invalid state.", null);
        } else {
            // then have to stringify the entire message payload
            payload = JSON.stringify(payload);

            console.log('sending message:', payload);
            this.sns.publish({
                Message: payload,
                MessageStructure: 'text',
                TargetArn: snsURL,
                Subject: subject,
            }, function (err, data) {
                callback(err, data);
            });
        }
    }
}