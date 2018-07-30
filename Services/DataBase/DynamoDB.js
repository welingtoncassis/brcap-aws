var AWS = require("aws-sdk");
var docClient;

module.exports = class DynamoDB {

    constructor(region) {
        AWS.config.update({region:region});
        docClient = new AWS.DynamoDB.DocumentClient();
    }

    delete(tableName, keyName, key, callback) {
        var object = {
            TableName: tableName,
            Key: {
                [keyName]: key
            }
        };

        docClient.delete(object, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { message: "Deleted successfully" });
            }
        });
    }

    get(tableName, keyName, key, callback) {
        var object = {
            TableName: tableName,
            Key: {
                [keyName]: key
            }
        };

        docClient.get(object, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data.Item);
            }
        });
    }

    put(tableName, item, callback) {
        var object = {
            TableName: tableName,
            Item: item
        };

        docClient.put(object, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
}