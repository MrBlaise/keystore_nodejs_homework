var express = require('express');
var app = express();

/**
 * Create the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
  res.error = [];
  res.tpl = {};
  return next();
});

/**
 * Routes
 */
require('./routes/auth')(app);
require('./routes/key')(app);

// app.use(express.static('static'));

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
  res.status(500).send('Internal error!');
  console.error(err.stack);
});

const port = 3000;

var server = app.listen(port, function () {
	console.log("Listening on port " + port)
});