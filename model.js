// mongoose dependencies
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bubblySchema = new Schema({
  _id: {
    type: Number
  },
 activity: {
   type: String
 },
 link: {
   type: String
 }
});

// create model variable
var bubblyModel = mongoose.model("bubblyModel", bubblySchema);

// export the model for router use
module.exports = bubblyModel;