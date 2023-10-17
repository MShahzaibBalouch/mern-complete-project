const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user");

router.get('/weeklyUserCount', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + (6 - today.getDay()));

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weeklyUserCount = [];

    for (let i = 0; i < 7; i++) {
      const startOfDay = new Date(weekStart);
      startOfDay.setDate(weekStart.getDate() + i);

      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);

      const userCount = await User.countDocuments({
        _id: {
          $gte: new mongoose.Types.ObjectId(Math.floor(startOfDay / 1000).toString(16) + '0000000000000000'),
          $lte: new mongoose.Types.ObjectId(Math.floor(endOfDay / 1000).toString(16) + '0000000000000000'),
        }
      });

      weeklyUserCount.push({
        day: days[i],
        userCount,
      });
      if (i === today.getDay()) {
        const todayUserCount = await User.countDocuments({
          _id: {
            $gte: new mongoose.Types.ObjectId(Math.floor(today / 1000).toString(16) + '0000000000000000'),
            $lte: new mongoose.Types.ObjectId(Math.floor(new Date() / 1000).toString(16) + '0000000000000000'),
          }
        });
        weeklyUserCount[i].todayUserCount = todayUserCount;
      }
    }

    res.json({ weeklyUserCount, message: 'Weekly user count for each day.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;