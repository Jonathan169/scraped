var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
var app = express();
//middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true });

require("./routes/Routes")(app)
require("./routes/html")(app)

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
