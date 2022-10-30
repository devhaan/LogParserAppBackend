// Importing the fs module
let fs = require("fs");

var path = require("path");

const parser = (buffer) => {
  let tempString = [];

  // By lines
  var lines = buffer.split("\n");
  for (var line = 0; line < lines.length; line++) {
    tempString.push(lines[line]);
  }
  return tempString;
};

const logParserToJson = (seperatedLinesLogData) => {
  let tempJson = [];
  seperatedLinesLogData.map((item) => {
    // object creater and inserter
    tempJson.push(arrToObject(item));
  });
  return tempJson;
};
const arrToObject = (data) => {
  let tempObject = {
    timestamp: "",
    loglevel: "",
    transactionId: "",
    err: "",
  };
  //timestamp
  let timeStamp = data.indexOf("Z") + 1;
  tempObject.timestamp = data.slice(0, timeStamp);

  //transactionId
  let transactionIdOk = data.indexOf("transactionId") + 15;
  tempObject.transactionId = data.slice(
    transactionIdOk + 1,
    data.indexOf('"', transactionIdOk + 1)
  );
  //loglevel
  let logLevel = data.indexOf("-", timeStamp);
  tempObject.loglevel = data.slice(
    logLevel + 1,
    data.indexOf("-", logLevel + 1)
  );

  if (data.indexOf('"err":') != -1) {
    let error = data.indexOf('"err"') + 6;
    tempObject.err = data.slice(error + 1, data.indexOf('"', error + 1));
  } else {
    tempObject.err = "Not found";
  }

  return tempObject;
};

module.exports.logConverter = (req, res,next) => {
  console.log("react to post action - loadFile");

  //here all request files data took in buffer
  var logFile = req.files[0];
  var buffer = logFile.buffer.toString();

  // here parse fuction will return seperated data by in list format
  let seperatedLinesLogData = parser(buffer);

  //here file is converted and return in json file format
  let ActualResponseDataLogParser = logParserToJson(seperatedLinesLogData);

  // here json object into file converted json format
  let data = JSON.stringify(ActualResponseDataLogParser, null, 2);

  fs.writeFile(__dirname+"/parsed.json", data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
   let file_location=__dirname+"/parsed.json";
   
  fs.readFile(file_location,(err,content) => {
    if(err){
      res.writeHead(404,{"Content-type":"text/html"});
       return res.end("<h1>NoT Converted");
    }
    else{
      res.writeHead(200,{"Content-Type":"application/json"});
       return res.end(content);
    }
  })
  
//return res.json(ActualResponseDataLogParser);
};
