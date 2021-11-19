const {User, Post} = require('../../models');
const router = require('express').Router();

router.post('/win', (req, res) => {
  console.log('hello encounter');
  res.json('{}');
})

module.exports = router;
