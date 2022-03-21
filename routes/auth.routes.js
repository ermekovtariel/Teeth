const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// ! /api/auth/register
router.post(
  '/register',
  [
    check('emial', 'Enter phone number').isMobilePhone(),
    check('password', 'Minimum password length 6 characters')
      .isLength({
        min: 6,
      })
      .exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        });
      }
      const { email, password } = req.body;
      const condidate = await User.findOne({ email });
      if (condidate) {
        return res.status(400).json({ message: 'Choose another login' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({
        message: 'User created',
      });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

// ! /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter a valid number').isPassportNumber(),
    check('password', 'Minimum password length 6 characters')
      .isLength({
        min: 6,
      })
      .exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login details',
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: 'User is not found',
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Error in login or password' });
      }
      const tocken = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      });
      res.json({ tocken, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

module.exports = router;
