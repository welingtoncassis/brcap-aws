// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var BRCAPAWS = require('../../index.js');

AWS.config.update({ region: "sa-east-1" });
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const bucketQueueMonitor = "brasilcap-darwin-queue-monitor";
const tableQueueMonitor = "darwin-queue-monitor";
const tableQueueMonitorRegion = "sa-east-1";

module.exports = class SQS {

    constructor(region) {
        AWS.config.update({ region: region });
        this.sqs = new AWS.SQS({ apiVersion: '2012-11-05', httpOptions: { timeout: 25000 } });
    }

    get(queueURL, callback) {
        if (queueURL === undefined || queueURL === null || queueURL === '') {
            callback("queueURL missing or in a invalid state.", null);
        } else {
            var params = {
                AttributeNames: [
                    "SentTimestamp"
                ],
                MaxNumberOfMessages: 1,
                MessageAttributeNames: [
                    "All"
                ],
                QueueUrl: queueURL,
                WaitTimeSeconds: 20
            };

            var params = {
                QueueUrl: queueURL,
                AttributeNames: ['All']
            };

            sqs.getQueueAttributes(params, function (err, queueData) {
                if (err) {
                    console.log(err, err.stack);
                    callback(err, null);
                } else {
                    sqs.receiveMessage(params, function (err, data) {
                        if (data && data.Messages) {

                            let retorno = {};
                            retorno.body = JSON.parse(JSON.parse(data.Messages[0].Body).Message);
                            retorno.receiptHandle = data.Messages[0].ReceiptHandle;
                            retorno.code = 200;
                            retorno.message = 'message found';
                            retorno.messageId = data.Messages[0].MessageId;
                            retorno.subject = JSON.parse(data.Messages[0].Body).Subject;
                            retorno.arn = queueData.Attributes.QueueArn;

                            let item = {
                                'arn': queueData.Attributes.QueueArn,
                                'messageId': data.Messages[0].MessageId,
                                'subject': JSON.parse(data.Messages[0].Body).Subject,
                                'operation': 'R',
                                'date': new Date().toISOString()
                            };

                            BRCAPAWS.Dynamo_Put(tableQueueMonitor, item, tableQueueMonitorRegion, function (err, dynamoData) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(data);
                                }
                            });

                            callback(err, retorno);
                        } else {
                            callback(err, { 'code': 204, 'message': 'empty queue' });
                        }
                    });
                }
            });
        }
    }

    delete(queueURL, receiptHandle, callback) {

        //console.log('chamou apagar')

        if (queueURL === undefined || queueURL === null || queueURL === '') {
            callback("queueURL missing or in a invalid state.", null);
        } else if (receiptHandle === undefined) {
            callback("queueURL missing or in a invalid state.", null);
        } else {
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: receiptHandle
            };
            this.sqs.deleteMessage(deleteParams, function (err, data) {
                callback(err, data);
            });
        }
    }

    deleteWithMonitor(queueURL, receiptHandle, arn, messageId, subject, callback) {

        //console.log('chamou apagar')

        if (queueURL === undefined || queueURL === null || queueURL === '') {
            callback("queueURL missing or in a invalid state.", null);
        } else if (receiptHandle === undefined) {
            callback("queueURL missing or in a invalid state.", null);
        } else if (messageId === undefined) {
            callback("messageId missing or in a invalid state.", null);
        } else if (subject === undefined) {
            callback("subject missing or in a invalid state.", null);
        } else if (arn === undefined) {
            callback("arn missing or in a invalid state.", null);
        }
        else {
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: receiptHandle
            };
            this.sqs.deleteMessage(deleteParams, function (err, data) {
                if (data) {
                    let item = {
                        'arn': arn,
                        'messageId': messageId,
                        'subject': subject,
                        'operation': 'D',
                        'date': new Date().toISOString()
                    };

                    BRCAPAWS.Dynamo_Put(tableQueueMonitor, item, tableQueueMonitorRegion, function (err, dynamoData) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }
                    });
                }

                callback(err, data);
            });
        }
    }
}