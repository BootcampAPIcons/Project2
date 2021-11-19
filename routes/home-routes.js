const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      // 'post_url',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      posts.map(p => console.log(Object.keys(p.user)));
      posts.map(p => console.log(Object.keys(p)));

      res.render('homepage', {
        posts,
        loggedIn: req.isAuthenticated(),
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      // 'post_url',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      console.log(post);
      res.render('single-post', {
        post,
        loggedIn: req.isAuthenticated()
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/encounter', (req, res) => {
  const authd = req.isAuthenticated();
  console.log(authd);
  if (authd) {
    console.log(req.user);
    res.render('encounter', {
      loggedIn: authd
    });
  } else {
    res.render('logged-out-game', {loggedIn: authd});
  }
});

router.get('/dashboard', (req, res) => {
  const authd = req.isAuthenticated();
  const usr = req.user;
  console.log(`authd: ${authd}, usr: ${usr.dataValues.username}`);
  if (!authd) {
    res.redirect('/');
  } else {
    res.render('dashboard', {loggedIn: authd, username: usr.dataValues.username, points: usr.dataValues.points});
  }
})

module.exports = router;
