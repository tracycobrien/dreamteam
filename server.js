// dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const bubblyModel = require('./model')

// initialize express
var app = express();

// data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// allows application to recognize static files in "public" folder
app.use(express.static("public"));

app.use(function (req, res, next) {
	//Enable cross-origin resource sharing
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// MongoDB configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bubblyModel");

var db = mongoose.connection;

db.on("error", function(err) {
 console.log("Mongoose Error: ", err);
});
db.once("open", function() {
 console.log("Mongoose connection successful.");
});

// set the app to listen on port 3000
app.listen(process.env.PORT || 3000, function () {
	console.log("App running on port 3000");
});