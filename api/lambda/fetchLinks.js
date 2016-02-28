console.log("Inside fetch links")
var AWS = require('aws-sdk');
var DOC = require("dynamodb-doc");

exports.handler = function(event, context) {
  console.log("Request received:\n", JSON.stringify(event));
  console.log("Context received:\n", JSON.stringify(context));


var ddb = new AWS.DynamoDB();
var docClient = new DOC.DynamoDB(ddb);

var params = {};
params.TableName = "LINKS";
var ddbResponse = docClient.scan(params, function(err, response) {
   if (err) {
       console.log(err);
   }
   else {
          console.log(response);
          context.succeed(response)
   }
});

}
