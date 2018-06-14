import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  profile: {
    type: String,
    default: "/assets/images/user-default-logo.png"
  },
}, { timestamp: true });

module.exports = mongoose.model('User', userSchema);