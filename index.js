
const http = require('http');
const PORT = process.env.PORT || 5000;

var MongoClient = require('mongodb').MongoClient
var url = "mongodb://chanon:chanon1234@ds135552.mlab.com:35552/mlabtest";

var message = "";
var promise1 =(inputText) => new Promise((resolve, reject) => {
    setTimeout(() => {
        message += inputText;
        resolve(message);
    }, 300)
})

function promise2(inputText) {

   return new Promise( ( resolve, reject ) => {
      message += inputText;
      resolve('gg');
  } );
}


function promise3() {

   return new Promise( ( resolve, reject ) => {
       http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(message);
    });
      resolve('gg');
  } );
}


function mongoQuery() {
    
    return new Promise( ( resolve, reject ) => {
   
     MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mlabtest");
    var query = { name: "Company Inc"};
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

function mongoInsert() {
    
    return new Promise( ( resolve, reject ) => {
   
     MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mlabtest");
    var myobj = { name: "Company Inc", address: "Test Insert Heroku" };
    dbo.collection("customers").insertOne(myobj, function(err, result) {
      
       if ( err )
       return reject( err );
        else
                {
                 resolve(result);
                }
        db.close();
        });
    });
   
  });
  
}    
 
const blah = async function (){
    
    await mongoInsert();
    var xxx = await mongoQuery();
    for(var idx =0; idx<xxx.length; idx++ )
    {
        await promise1(xxx[idx].name);
        await promise2(xxx[idx].address);
    }
   await promise2(" Testing from Cloud9");
   await server();
   await server_begin();
}

const server =   http.createServer((req, res) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/plain');
   res.end(message);
})

const server_begin =  server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
})

blah();    

