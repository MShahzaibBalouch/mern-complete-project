const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
