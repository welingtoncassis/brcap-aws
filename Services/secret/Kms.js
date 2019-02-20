var AWS = require('aws-sdk');
var kms;

module.exports = class KMS {

    constructor(region) {
        AWS.config.update({ region: region });
        kms = new AWS.KMS({ apiVersion: '2014-11-01' });
    }

    encrypt(KeyId, Plaintext, callback) {
        kms.encrypt({ KeyId, Plaintext }, (err, data) => {
            if (err) console.log(err, err.stack);
            else {
                callback(err, data);
            }
        });
    }

    decrypt(ciphertextBlob, callback) {
        const encryptedString = Buffer.from(ciphertextBlob).toString("base64");
        const params = {CiphertextBlob: Buffer.from(encryptedString, "base64")};

        kms.decrypt(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } 
            else {
                callback(err, Buffer.from(data.Plaintext).toString());
            }
        });
    }
}