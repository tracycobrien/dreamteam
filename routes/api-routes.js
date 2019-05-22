var bubblyModel = require("../model.js")

app.get('/', function (req, res, next) {
	// Handle the get for this route
});

app.post('/', function (req, res, next) {
	// Handle the post for this route
});

// get random activity
app.get("/random", function (req, res) {
	var random = Math.floor(Math.random() * 27);
	bubblyModel.findOne().skip(random)
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