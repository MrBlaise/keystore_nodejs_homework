var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(session({
  secret: 'keystore_much_secret_such_titok',
  cookie: {
    maxAge: 60000
  },
  resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Create the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
  res.tpl = {};
  res.tpl.error = [];
  return next();
});

/**
 * Routes
 */
require('./routes/auth')(app);
require('./routes/key')(app);

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