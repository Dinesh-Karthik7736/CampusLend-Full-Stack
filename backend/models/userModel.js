const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { // Using Firebase UID as the document ID
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String, // URL to profile picture
  },
  phone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  collegeYear: {
    type: String,
    default: '',
  },
  dob: {
    type: Date,
  },
  trustScore: {
    type: Number,
    default: 100,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
