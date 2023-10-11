const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  image: { type: String, required: false },
  email: { type: String, required: false, unique: true },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
