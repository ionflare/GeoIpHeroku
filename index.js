const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const geoip = require('geoip-lite');

// create a new express server
const app = express()


var MongoClient = require('mongodb').MongoClient
//var url = "mongodb://localhost:27017";
var url = "mongodb://chanon:chanon1234@ds135552.mlab.com:35552/mlabtest";

var message = "Init ";

var promise1 =(inputText) => new Promise((resolve, reject) => {
    setTimeout(() => {
        message += inputText;
        //console.log(message);
        resolve(message);
    }, 200)
})

function promise2(inputText) {

   return new Promise( ( resolve, reject ) => {
      message += inputText;
      resolve('gg');
  } );
}

function testGeoIP(inputIP) {

   geoip.lookup(inputIP);
   return new Promise( ( resolve, reject ) => {
      message = geoip;
      resolve('gg');
  } );
}



function mongoQuery() {
    
    return new Promise( ( resolve, reject ) => {
   
     MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    //var dbo = db.db("mydb");
    var dbo = db.db("mlabtest");
    var query = { name: "Test ja"};
    //dbo.collection("customers").findOne({}, function(err, result) {
    dbo.collection("customers").find(query).toArray(function(err, result)
    {
    if (err) { return reject( err );}
    else{
        resolve(result);
  
    }

    db.close();
    });
    });
   
  });
  
}    



function replyYesNoTemplate(client,replyToken, returnStr,postBackStr) {

   return new Promise( ( resolve, reject ) => {
      client.replyMessage(replyToken, 
      {


    type: "location",
    title: "my location",
    address: "SWP",
    latitude: 13.7333,
    longitude: 100.4833


  
 }
 );
        
  } );
}



const lineBot = require('@line/bot-sdk');
const Client = require('@line/bot-sdk').Client;


/*
const clientBot_2 = new Client({
  channelAccessToken:  '+Z00sQIfBQjVouvA+bFr9LpyYi5pErdfu0hejVGhtzlEmw3RJRyV0V5tohj832ykJqb2S+6mcIRvWhw7V7PDpFNWzRZlVNLg59J8PU+71rxjCqPJxfSIET6QcCoU1Vcb6UnJSMb/I5qVtwr4XpIhKQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'cb7cdb67c6a8f02f2b7119365518108b'
});
*/



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.get('/', async (req, res) => {
 
     /*
    var xxx = await mongoQuery();
    //var yyy = await mongoInsert();
    
    
    for(var idx =0; idx<xxx.length; idx++ )
    {
        await promise2(xxx[idx].name);
        await promise2(xxx[idx].address);
    }
  */
  //var ip = "207.97.227.239";
  var geo = await testGeoIP("58.10.224.143");  
  
  //await res.send(geo.country);
  await res.send(req.connection.remoteAddress);
   //await replyYesNoTemplate(clientBot_2, req.body.events[0].replyToken, message, "qq");
  
  
  
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server starting on PORT:' + process.env.PORT)
})

