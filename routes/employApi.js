// Node.js Code (employeeRoutes.js)

const express = require('express');
const router = express.Router();
const Employee = require('../models/employ');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const secret_key = '@rwatechpk-secret-key';
router.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
});

router.post('/create', upload.single('image'), async (req, res) => {
    try {
        console.log('Req Body:', req.body);
        console.log('Req File:', req.file);
        const {
            username,
            password,
            firstname,
            lastname,
            email,
            department,
            hiredate,
            salary,
            cnic,
            dob,
            qualification,
            benefits,
            job,
            image
        } = req.body;
        const imagePath = req.file ? req.file.filename : '';
        console.log(req.file);
        console.log(imagePath);
        const newEmployee = new Employee({
            username,
            password,
            firstname,
            lastname,
            email,
            department,
            hiredate,
            salary,
            cnic,
            dob,
            qualification,
            benefits,
            job,
            image,
        });
        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
        console.log(savedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/', async (req, res) => {
    try {
        const admins = await Employee.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const updatedEmployee = await Employee.findByIdAndUpdate(
            adminId,
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                image: req.body.image,
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
  
      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }
  
      res.json(employee);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
