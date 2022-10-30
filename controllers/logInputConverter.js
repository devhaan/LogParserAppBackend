// Importing the fs module
let fs = require("fs");
var path = require("path");
const Helper = require("./Helper");

module.exports.logConverter = (req, res, next) => {
  console.log("react to post action - loadFile");

  //here all request files data took in buffer
  var logFile = req.files[0];
  var buffer = logFile.buffer.toString();

  // here parse fuction will return seperated data by in list format
  let seperatedLinesLogData = Helper.parser(buffer);

  //here file is converted and return in json file format
  let ActualResponseDataLogParser = Helper.logParserToJson(seperatedLinesLogData);

  // here json object into file converted json format
  let data = JSON.stringify(ActualResponseDataLogParser, null, 2);

  fs.writeFile(__dirname + "/parsed.json", data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
  let file_location = __dirname + "/parsed.json";

  fs.readFile(file_location, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>NoT Converted</h1>");
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(content);
    }
  });

  return;
};
