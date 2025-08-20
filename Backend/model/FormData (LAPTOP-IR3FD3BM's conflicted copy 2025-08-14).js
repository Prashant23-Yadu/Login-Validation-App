const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: String,
  role: String,
  recommend: String,
  languages: [String],
  comment: String,
});

module.exports = mongoose.model('FormData', formSchema);
