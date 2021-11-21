let router = require('express').Router();
const {User} = require('../models');

const validateRegistration = async (req, res, next) => {
  console.log(req.body);
  const exists = await User.exists(req.body.username, req.body.email);
  console.log(`exists: ${exists}`);
  if (exists) {
    return res.redirect('/register');
  }
  next();
};

router.get('/', (req, res) => res.render('register'))
router.post('/', validateRegistration, async(req, res) => {
  let saved = await (new User({...req.body, points: 0})).save();
  res.redirect('/');
});

module.exports = router;
