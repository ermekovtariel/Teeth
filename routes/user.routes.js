const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();

//! /api/user
router.get('/user', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select('-password'); // не возвращаем пароль
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({
      user: {
        name: user.name,
        surname: user.surname,
        city: user.city,
        birthday: user.birthday,
        sex: user.sex,
        role: user.role,
        email: user.email,
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка при получении данных пользователя' });
  }
});

router.put('/user', auth, async (req, res) => {
    try {
      const userId = req.user.userId;
      const updates = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      // Обновляем только те поля, которые пришли
      Object.keys(updates).forEach((key) => {
        user[key] = updates[key];
      });

      await user.save();

      res.json({
        user: {
          name: user.name,
          surname: user.surname,
          city: user.city,
          birthday: user.birthday,
          sex: user.sex,
          role: user.role,
          email: user.email,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Ошибка при обновлении данных' });
    }
  }
);


module.exports = router;
