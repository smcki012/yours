console.log("Inside save data")
var crypto = require('crypto');
var AWS = require('aws-sdk');
var DOC = require("dynamodb-doc");

exports.handler = function(event, context) {
  console.log("Request received:\n", JSON.stringify(event));
  console.log("Context received:\n", JSON.stringify(context));

	// Basic Callback
var pfunc = function(err, data) {
    if (err) {
        console.log(err, err.stack);
        context.fail("failed saving");
    } else {
        console.log(data);
        context.succeed("saved");
    }
}

var ddb = new AWS.DynamoDB();
var docClient = new DOC.DynamoDB(ddb);
var params = {};
params.TableName = "LINKS";
params.Item = event;
params.Item.LINK_ID = crypto.createHash('md5').update(JSON.stringify(event)).digest("hex");
params.Item.TIMESTAMP = Date.now()
console.log("About to save "  + JSON.stringify(params))
docClient.putItem(params, pfunc);
}
