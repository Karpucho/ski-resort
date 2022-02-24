const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Trainer } = require('../db/models');
const clearAttributes = require('../helpers/clearAttributes');
require('dotenv').config();

router.route('/')
  .post(async (req, res) => {
    const { email, password, role } = req.body;
    if (role === 'user') {
      let user;
      try {
        user = await User.findOne({
          where: { email },
        });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!user) return res.sendStatus(404);

      console.log(password);

      if (await bcrypt.compare(password, user.password)) {
        const info = clearAttributes(user);
        const token = jwt.sign({ role: 'user', id: user.id }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ token, info, role: 'user' });
      }

      // incorrect password
      return res.sendStatus(400);
    } if (role === 'trainer') {
      let trainer;
      try {
        trainer = await Trainer.findOne({
          where: { email },
        });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!trainer) return res.sendStatus(404);

      if (await bcrypt.compare(password, trainer.password)) {
        const info = clearAttributes(trainer);
        const token = jwt.sign({ role: 'trainer', id: trainer.id }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ token, info, role: 'trainer' });
      }

      // incorrect password
      return res.sendStatus(400);
    }
  });
module.exports = router;
