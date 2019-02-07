var AWS = require("aws-sdk");
var docClient;

module.exports = class DynamoDB {

    constructor(region) {
        AWS.config.update({region:region});
        docClient = new AWS.DynamoDB.DocumentClient();
    }

    delete(object, callback) {
       
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

        console.log(object);

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


    getSortKey(tableName, keys, callback) {
        var object = {
            TableName: tableName,
            Key: keys
            
        };

        docClient.get(object, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data.Item);
            }
        });
    }

    update(object, callback) {

        docClient.update(object, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    query(object, callback) {

        docClient.query(object, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    scan(object, callback) {

        docClient.scan(object, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    batchWrite(object, callback) {

        docClient.batchWrite(object, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
}