// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var BRCAPAWS = require('../../index.js');

var sns;

const bucketQueueMonitor = "brasilcap-darwin-queue-monitor";
const tableQueueMonitor = "darwin-queue-monitor";
const tableQueueMonitorRegion = "sa-east-1";

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

            const randomId = Math.floor(new Date().valueOf() + Math.random());

            payload.QueueMonitorId = randomId;

            this.sns.publish({
                Message: JSON.stringify(payload),
                MessageStructure: 'text',
                TargetArn: snsURL,
                Subject: subject,
            }, function (err, data) {
                if (data) 
                {
                    let item = {
                        'arn': snsURL,
                        'date': new Date().toISOString().substr(0,10)+"#"+randomId,
                        'messageId': randomId,
                        'operation': 'S',
                        'subject': subject,
                        'criacao' : new Date().toISOString()
                    };

                    BRCAPAWS.Dynamo_Put(tableQueueMonitor, item, tableQueueMonitorRegion, function (err, dynamoData) {
                        if (err) {
                            console.log(err);
                        } else {
                            let sns = new AWS.SNS();
                            let params = {
                                'TopicArn': snsURL
                            };
                            sns.listSubscriptionsByTopic(params, function (err, listSubscriptionData) {
                                if (err)
                                    console.log(err, err.stack);
                                else
                                    listSubscriptionData.Subscriptions.forEach(function (element) {

                                        if (element.Protocol == 'sqs') {

                                            let item = {
                                                'arn': element.Endpoint,
                                                'messageId': randomId,
                                                'subject': subject,
                                                'operation': 'S',
                                                'date': new Date().toISOString().substr(0,10)+"#"+randomId,
                                                'criacao' : new Date().toISOString()

                                            };

                                            BRCAPAWS.Dynamo_Put(tableQueueMonitor, item, tableQueueMonitorRegion, function (err, dynamoData) {
                                                if (err) {
                                                    console.log(err, err.stack);
                                                }
                                                else {
                                                    console.log("BRCAP-AWS: dados gravados no dynamo.");
                                                }
                                            });
                                        }

                                    }, this);
                            });

                            BRCAPAWS.S3_Put(bucketQueueMonitor, randomId.toString(), payload, function (err, s3Data) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("BRCAP-AWS: dados gravados no S3.");
                                }
                            });
                        }
                    });
                }

                callback(err, data);
            });
        }
    }
}