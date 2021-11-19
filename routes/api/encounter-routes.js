const {User, Post} = require('../../models');
const router = require('express').Router();

router.post('/win', async (req, res) => {
  console.log('hello encounter');
  // res.json('{}');
  console.log(`user keys: ${Object.keys(req.user.dataValues)}`)
  console.log(req.body);
  // id,username,email,password,points,character_name
  let points = req.user.dataValues.points + req.body.reward;
  console.log(points);
  // let sq = await User.update({where: {id: req.user.dataValues.id}, points});
  let sq = await User.update(
    {points},
    {where: {id: req.user.dataValues.id}}
  );
  console.log(sq);
  // res.redirect('/');
  res.json({points});
})

module.exports = router;
