// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var BRCAPAWS = require('../../index.js');

var sns;

const bucketQueueMonitor = "brasilcap-sns-history-notification";

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

            const now = new Date()
            const randomId = Math.floor(new Date().valueOf() + (Math.random() * Math.random()));

            payload.QueueMonitorId = randomId;

            this.sns.publish({
                Message: JSON.stringify(payload),
                MessageStructure: 'text',
                TargetArn: snsURL,
                Subject: subject,
            }, function (err, data) {
                if (data) {

                    const path = snsURL +"/"+now.getFullYear() +"-"+now.getMonth()+"-"+now.getDay()+"/"+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"/"

                    BRCAPAWS.S3_Put(bucketQueueMonitor, path+randomId.toString(), payload, function (err, s3Data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("BRCAP-AWS: dados gravados no S3.");
                        }
                    });
                }

                callback(err, data);
            });
        }
    }
}