'use strict';
const AWS = require('aws-sdk');
const {REGION, ACCOUNT_ID, TOPIC} = require('./constants/aws-const');
var sns = new AWS.SNS();

/*global exports*/
exports.handler = function (event, context, callback) {
    event.Records.forEach((record) => {
        console.log('Stream record: ', JSON.stringify(record, null, 2));
        
        if (record.eventName == 'INSERT' || record.eventName == 'MODIFY') {
            var values = record.dynamodb.NewImage;
            //console.log("Debug: insert new image = " + JSON.stringify(values));

            var firstName = "";
            var lastName  = ""; 
            var messageContent = "";          
            Object.keys(values).map(function(k, i) { 
                let datas = values[k];
                if (typeof datas != 'undefined' && datas != null) { 
                    Object.keys(datas).map(function(k2, i2) {
                        messageContent += (k + " = " + datas[k2] + ",\n");
                        if (k == "firstName") {
                            firstName = datas[k2];
                        } else if (k == "lastName") {
                            lastName = datas[k2];
                        }                        
                    });
                }
            }); 
            var describe = 'unknown';
            
            if (record.eventName == 'INSERT' ) {
                describe = 'new';
            } else if (record.eventName == 'MODIFY') {
                describe = 'updated';
            }
            var params = {
                Subject: 'A ' + describe + ' registration from ' + firstName + ' ' + lastName, 
                Message: messageContent,
                TopicArn: 'arn:aws:sns:' + REGION + ':' + ACCOUNT_ID + ':' + TOPIC
            };
            sns.publish(params, function(err, data) {
                if (err) {
                    console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Results from sending message: ", JSON.stringify(data, null, 2));
                }
            });
        }
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
	
	context.succeed({
		statusCode: 200,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(event)
	});
};
