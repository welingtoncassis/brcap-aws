var SNS = require("./Services/notifications/SNS");
var SQS = require("./Services/notifications/SQS");
var Redis = require("./Services/cache/Redis");
var S3 = require("./Services/storage/S3");
var Dynamo = require("./Services/DataBase/DynamoDB");

const {
  getIndex,
  putIndex,
  getAllIndex,
  deleteIndex,
  putMappingType,
  searchTypeIndex,
  postData,
  getDataById
} = require("./Services/search/ElasticSearch");

exports.SNS_Post = function(snsURL, payload, subject, region, callback) {
  new SNS(region).post(snsURL, payload, subject, function(err, data) {
    callback(err, data);
  });
};

exports.SQS_Get = function(queueURL, region, callback) {
  new SQS(region).get(queueURL, function(err, data) {
    callback(err, data);
  });
};

exports.SQS_Delete = function(queueURL, receiptHandle, region, callback) {
  new SQS(region).delete(queueURL, receiptHandle, function(err, data) {
    callback(err, data);
  });
};

exports.SQS_DeleteWithMonitor = function(
  queueURL,
  receiptHandle,
  arn,
  messageId,
  subject,
  region,
  callback
) {
  new SQS(region).deleteWithMonitor(
    queueURL,
    receiptHandle,
    arn,
    messageId,
    subject,
    function(err, data) {
      callback(err, data);
    }
  );
};

exports.SQS_ListQueues = function(queueNamePrefix, region, callback) {
  new SQS(region).listQueues(queueNamePrefix, function(err, data) {
    callback(err, data);
  });
};

exports.Redis_Get = function(key, host, port, callback) {
  new Redis(host, port).get(key, function(err, data) {
    callback(err, data);
  });
};

exports.Redis_Post = function(key, value, ttl, host, port, callback) {
  new Redis(host, port).post(key, value, ttl, function(err, data) {
    callback(err, data);
  });
};

exports.Redis_Delete = function(key, host, port, callback) {
  new Redis(host, port).delete(key, function(err, data) {
    callback(err, data);
  });
};

exports.S3_Get = function(bucket, key, callback) {
  new S3().get(bucket, key, function(err, data) {
    callback(err, data);
  });
};

exports.S3_Put = function(bucket, key, param, callback) {
  new S3().put(bucket, key, param, function(err, data) {
    callback(err, data);
  });
};

exports.S3_PutObject = function(param, callback) {
  new S3().putObject(param, function(err, data) {
    callback(err, data);
  });
};

exports.S3_DeleteObject = function (bucket, pathFileName, callback) {
  new S3().delete(bucket, pathFileName, function (err, data) {
    callback(err, data);
  });
};

exports.Dynamo_Delete = function(object, region, callback) {
  new Dynamo(region).delete(object, function(err, data) {
    callback(err, data);
  });
};

exports.Dynamo_Get = function(tableName, nameKey, key, region, callback) {
  new Dynamo(region).get(tableName, nameKey, key, function(err, data) {
    callback(err, data);
  });
};

exports.Dynamo_Put = function(tableName, item, region, callback) {
  new Dynamo(region).put(tableName, item, function(err, data) {
    callback(err, data);
  });
};

exports.Dynamo_getSortKey = function(tableName, keys, region, callback) {
  new Dynamo(region).getSortKey(tableName, keys, function(err, data) {
    callback(err, data);
  });
};

exports.Dynamo_Query = function(object, region, callback) {
  new Dynamo(region).query(object, function(err, data) {
    callback(err, data);
  });
};

exports.Dynamo_update = function(object, region, callback) {
  new Dynamo(region).update(object, function(err, data) {
    callback(err, data);
  });
};

exports.Dynamo_scan = function(object, region, callback) {
  new Dynamo(region).scan(object, function(err, data) {
    callback(err, data);
  });
};

exports.Dynamo_batchWrite = function(object, region, callback) {
  new Dynamo(region).batchWrite(object, function(err, data) {
    callback(err, data);
  });
};

// ElasticSearch
exports.ES_getIndex = params => getIndex(params);
exports.ES_getAllIndex = params => getIndex(params);
exports.ES_putIndex = params => putIndex(params);
exports.ES_deleteIndex = params => deleteIndex(params);
exports.ES_putMappingType = params => putMappingType(params);
exports.ES_searchTypeIndex = params => searchTypeIndex(params);
exports.ES_postData = params => postData(params);
exports.ES_getAllIndex = params => getAllIndex(params);
exports.ES_getDataById = params => getDataById(params);
