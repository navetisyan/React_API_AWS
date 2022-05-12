var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
  region: "us-east-1",
});

console.log("Writing entries to MenuLinks table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var menuLinksData = JSON.parse(
  fs.readFileSync("../components/data/services.json", "utf8")
);

menuLinksData.forEach(function (service) {
  var params = {
    TableName: "Services",
    Item: {
      name: service.name,
    },
  };

  dynamodb.put(params, function (err, data) {
    if (err)
      console.error(
        "Unable to load data into table for menu links",
        service.name,
        ". Error: ",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", service.name, "to table.");
  });
});
