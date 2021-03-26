const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
})

module.exports = mongoose.model('User', schema);
