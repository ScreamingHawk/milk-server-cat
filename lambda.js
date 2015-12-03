var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});

exports.handler = function(event, context) {
    var s3 = new AWS.S3();
    var params = {Bucket: 'cat-assets', Key: 'catfacts.txt'};
    var file = s3.getObject(params, function(err, data){
        if(err){
            context.fail(err);
        }
        var lines = data.Body.toString().split('\r\n');
        var fact = lines[Math.floor(Math.random()*lines.length)] + "! :3";
        console.log(fact);
        
        var sns = new AWS.SNS();
        params = {
            Message: fact,
            Subject: "Cat Facts",
            TopicArn: "arn:aws:sns:us-east-1:110820207274:CatFacts"
        };
        sns.publish(params, context.done);
    });
};