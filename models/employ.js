const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    hiredate: { type: String, required: true },
    salary: { type: String, required: true, },
    cnic: { type: String, required: true, unique: true },
    dob: { type: String },
    qualification: { type: String, required: true },
    benefits: { type: String },
    job: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
