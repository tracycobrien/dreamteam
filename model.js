// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var bubblySchema = new Schema({
 activity: {
   type: String
 },
 id: {
   type: Number
 },
 link: {
   type: String
 }
});

// Create the Model
var bubblyModel = mongoose.model("bubblyModel", bubblySchema);

// Export it for use elsewhere
module.exports = bubblyModel;