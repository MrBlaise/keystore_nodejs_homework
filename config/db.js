var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/keystore');
module.exports = mongoose;