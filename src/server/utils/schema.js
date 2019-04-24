var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: { required: true, type: String, unique: true },
  password: String, // Store as Bcrypt
  bins: Array, // Array of Bin _ids 
  profilePic: { type: String, default: 'avatar-castle.png'}
}, { collection: 'users'});

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR); 
  const hash = bcrypt.hashSync(user.password, salt);

  // override the cleartext password with the hashed one
  user.password = hash;
  next();
});

var BinSchema = new Schema({
  author: { required: true, type: ObjectID },
  name: { required: true, type: String },
  html: { type: String }, // Sanatize!
  css: { type: String }, // Sanatize!
  js: { type: String } // Sanatize!
}, { collection: 'bins' });

module.exports = {
  User: mongoose.model('User', UserSchema),
  Bin: mongoose.model('Bin', BinSchema)
}
