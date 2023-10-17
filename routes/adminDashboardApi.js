const express = require('express');
const router = express.Router();
const ChartData = require('../models/adminDashboard');
const Admin = require('../models/admin');
const Employee = require('../models/employ');
const Product = require('../models/product');
const User = require("../models/user");

async function updateChartData() {
  try {
    const admin = await Admin.countDocuments();
    const employee = await Employee.countDocuments();
    const product = await Product.countDocuments();
    const user = await User.countDocuments();

    const chartData = await ChartData.findOneAndUpdate(
      {},
      { admin, employee, product, user },
      { new: true, upsert: true }
    );

    return chartData;
  } catch (error) {
    throw new Error('Error updating chart data');
  }
}


router.post('/', async (req, res) => {
  try {
    const chartData = await updateChartData();
    res.json({ message: 'Chart data created/updated successfully', chartData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  updateChartData();
  try {
    const chartData = await ChartData.findOne();
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chart data' });
  }
});


router.put('/', async (req, res) => {
  try {
    const chartData = await updateChartData();
    res.json({ message: 'Chart data updated successfully', chartData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
