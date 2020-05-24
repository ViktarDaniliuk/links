const { Router } = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
      '/register', 
      [
         check('email', 'Incorrect email').isEmail(),
         check('password', 'Minimum password length 6 characters').isLength({ min: 6 })
      ],
      async (req, res) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect registration data'
         })
      }

      const { email, password } = req.body;
      // looking for a user with that name in the database
      const candidate = await User.findOne({ email: email });

      if (candidate) {
         return res.status(400).json({ message: `User with the email "${email}" already exists`});
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email: email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'User created' });
   } catch (e) {
      res.status(500).json({ message: 'Something went wrong try again'})
   }
});

// /api/auth/login
router.post(
      '/login',
      [
         check('email', 'Incorrect email').normalizeEmail().isEmail(),
         check('password', 'Enter password').exists()
      ] ,
      async (req, res) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect login data'
         })
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
         return res.status(400).json({ message: 'User not found'});
      }
      // т.к. пароль в базе данных захеширован, то проерку его на соответствие необходимо проводить с помощью модуля bcrypt
      const isMatch = await bcrypt.compare( password, user.password );

      if (!isMatch) {
         return res.status(400).json({ message: 'Password is wrong'});
      }

      const token = jwt.sign(
         { userId: user.id },
         config.get('jwtSecret'),
         { expiresIn: '1h' }
      );

      res.json({ token: token, userId: user.id });
   } catch (e) {
      res.status(500).json({ message: 'Something went wrong try again'})
   }
});

module.exports = router;