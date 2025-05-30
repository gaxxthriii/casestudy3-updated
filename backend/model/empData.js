const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  empid: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('employee', employeeSchema);
