// dependencies
var bubblyModel = require("./model.js")
var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var mongoose = require("mongoose");

// get the home page
router.get('/', function (req, res, next) {
	res.sendStatus(200);
});

// post route handling
// router.post('/', function (req, res, next) {
// 	res.sendStatus(200);
// });

// get one random document from the database without duplicates
router.get("/activity", function (req, res) {
	//get count of how many documents are within bubblyModel
	bubblyModel.count().exec(function (err, count) {
		//get random entry
		var random_entry = Math.floor(Math.random() * count)
		//Skip the desired match and returns it
		bubblyModel.findOne().skip(random_entry)
			.exec(function (error, doc) {
				if (error) {
					res.send(error);
				}
				else {
					res.json(doc);
					console.log(doc);
				}
			});
	});
});

// post function that allows the user to add a new activity to the database and display
// app.post("/api/post", function(req, res) {
// 	bubblyModel.create({
// 		id: req.body._id,
// 		activity: req.body.activity,
//		link: req.body.link
// 	}).then(function(results) {
//		console.log(results);
// 		res.end();
// 	});
// });