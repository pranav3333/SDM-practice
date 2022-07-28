var express=require("express");
var app = express();
var bodyParser=require("body-parser");
var router = require("./router");
 
 //add middleware
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));


 //start the server

    // associate router
    router(app);

 app.listen(7000);
 console.log("Producthub service listening on port 7000");
 