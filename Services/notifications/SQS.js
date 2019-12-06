// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var sqs;

module.exports = class SQS {

    constructor(region) {
        AWS.config.update({ region: region });
        sqs = new AWS.SQS({ apiVersion: '2012-11-05', httpOptions: { timeout: 25000 } });
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

            var paramsForAttributes = {
                QueueUrl: queueURL,
                AttributeNames: ['All']
            };

            sqs.getQueueAttributes(paramsForAttributes, function (err, queueData) {

                if (err) {
                    console.log(err, err.stack);
                    callback(null, err.stack);
                } else {
                    try {
                        sqs.receiveMessage(params, function (err, data) {
                            if (data && data.Messages) {
                                const retorno = {};
                                const Message = JSON.parse(JSON.parse(data.Messages[0].Body).Message);

                                if (Message.QueueMonitorId) {

                                    retorno.body = Message;
                                    retorno.receiptHandle = data.Messages[0].ReceiptHandle;
                                    retorno.code = 200;
                                    retorno.message = 'message found';
                                    retorno.messageId = Message.QueueMonitorId;
                                    retorno.subject = JSON.parse(data.Messages[0].Body).Subject;
                                    retorno.arn = queueData.Attributes.QueueArn;

                                    callback(null, retorno);
                                } else {
                                    retorno.body = Message;
                                    retorno.receiptHandle = data.Messages[0].ReceiptHandle;
                                    retorno.code = 200;
                                    retorno.message = 'message found';

                                    callback(null, retorno);
                                }
                            } else {
                                callback(err, { 'code': 204, 'message': 'empty queue' });
                            }
                        });

                    } catch (error) {
                        callback(error, null);
                    }
                }
            });
        }
    }

    delete(queueURL, receiptHandle, callback) {

        if (queueURL === undefined || queueURL === null || queueURL === '') {
            callback("queueURL missing or in a invalid state.", null);
        } else if (receiptHandle === undefined || receiptHandle === null || receiptHandle === '') {
            callback("queueURL missing or in a invalid state.", null);
        } else {
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: receiptHandle
            };
            sqs.deleteMessage(deleteParams, function (err, data) {
                callback(err, data);
            });
        }
    }

    deleteWithMonitor(queueURL, receiptHandle, arn, messageId, subject, callback) {

        if (queueURL === undefined || queueURL === null || queueURL === '') {
            callback("queueURL missing or in a invalid state.", null);
        } else if (receiptHandle === undefined || receiptHandle === null || receiptHandle === '') {
            callback("queueURL missing or in a invalid state.", null);
        } else if (messageId === undefined || messageId === null || messageId === '') {
            callback("messageId missing or in a invalid state.", null);
        } else if (subject === undefined || subject === null || subject === '') {
            callback("subject missing or in a invalid state.", null);
        } else if (arn === undefined || arn === null || arn === '') {
            callback("arn missing or in a invalid state.", null);
        }
        else {
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: receiptHandle
            };
            sqs.deleteMessage(deleteParams, function (err, data) {
                callback(err, data);
            });
        }
    }

    listQueues(queueNameSufix, callback) {
        var params = {};
        var retorno = [];
        var count = 0;
        sqs.listQueues(params, function (err, listQueueData) {
            if (err) {
                console.log(err, err.stack);
            } else {

                listQueueData.QueueUrls.forEach(function (element) {
                    if (element.endsWith(queueNameSufix)) {
                        var params = {
                            QueueUrl: element,
                            AttributeNames: ['QueueArn']
                        };
                        sqs.getQueueAttributes(params, function (err, queueAttributesData) {
                            if (err) {
                                console.log(err, err.stack);
                                callback(err, retorno);
                            }
                            else {
                                retorno.push(queueAttributesData.Attributes.QueueArn);

                                if (count == listQueueData.QueueUrls.length - 1) {
                                    callback(err, retorno);
                                }

                                count++;
                            }
                        });
                    } else {
                        if (count == listQueueData.QueueUrls.length - 1) {
                            callback(err, retorno);
                        }
                        count++;
                    }
                }, this);
            }
        });
    }
}