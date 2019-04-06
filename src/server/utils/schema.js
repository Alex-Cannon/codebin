var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String, // Store as Bcrypt
  bins: Array // Array of Bin _ids 
});

var BinSchema = new Schema({
  name: String,
  html: String, // Sanatize!
  css: String, // Sanatize!
  js: String // Sanatize!
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Bin: mongoose.model('Bin', BinSchema)
}
