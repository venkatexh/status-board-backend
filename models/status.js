const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  name: String,
  color: String
})

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;