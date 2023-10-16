const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const secret_key = '@rwatechpk-secret-key';
router.use(express.json());
router.use(
  session({
    secret: secret_key,
    resave: false,
    saveUninitialized: true,
  })
);

router.get('/', verifyToken, async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const adminId = req.params.id;
    const updatedAdmin = await Admin.findByIdAndUpdate(
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

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    if (!(password === admin.password)) {
      return res.status(401).json({ message: 'Password does not matched!' });
    }

    const token = jwt.sign(
      { username: admin.username, adminId: admin._id },
      secret_key,
      { expiresIn: '1h' }
    );
    req.session.token = token;

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during logout' });
      }
      res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function verifyToken(req, res, next) {
  const token = req.session.token || req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    req.admin = decoded;
    next();
  });
}

module.exports = router;
