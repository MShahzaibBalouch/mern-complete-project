const mongoose = require('mongoose');

const ChartDataSchema = new mongoose.Schema({
  admin: {
    type: Number,
    default: 0,
  },
  employee: {
    type: Number,
    default: 0,
  },
  product: {
    type: Number,
    default: 0,
  },
  user: {
    type: Number,
    default: 0,
  },
});

const ChartData = mongoose.model('ChartData', ChartDataSchema);

module.exports = ChartData;
