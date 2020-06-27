const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");


// setting up the port
const PORT = process.env.PORT || 8080;

// initializes express 
const app = express();

// bringing in the morgan logger 
app.use(logger("dev"));

// bringing in middleware to parse the request body and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// bringing in middleare to serve static files such as images, CSS files, and JavaScript files
app.use(express.static("public"));

// using mongoose to connect to database
mongoose.connect(process.env.MONGOD_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useFindAndModify: false});

// bringing in the routes folder 
require('./routes/api-routes')(app)
require('./routes/html-routes')(app)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});