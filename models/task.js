const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  status: String,
  desc: String
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
