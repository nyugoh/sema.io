import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  profile: {
    type: String,
    default: "/assets/images/user-default-logo.png"
  },
}, { timestamp: true });

userSchema.methods.generateHash = password => bcrypt.genSalt(10).then( salt => salt ).then( salt => bcrypt.hash(password, salt)).then( hash => hash);

userSchema.methods.compareHash = (hash, password) => bcrypt.compare(password, hash).then( isMatch => isMatch);


module.exports = mongoose.model('User', userSchema);