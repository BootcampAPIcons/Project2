const router = require('express').Router();
const { User } = require('../models');

const createLoginRoutes = passport => {

  // passport.use(new LocalStrategy({
  //   usernameField: 'email'
  // },
  // function(email, password, done) {
  //   User.findOne({where: {email}}).then((err, user) => {
  //     if (err) {return done(err);}
  //     if (!user) return done(null, false, {message: 'wrong username'});
  //     if (!user.checkPassword(password)) {
  //       return done(null, false, {message: 'wrong password'
  //     })};
  //     return done(null, user);
  //   }) 
  // }
  // ))

  router.get('/login', (req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) return res.redirect('/');
    res.render('login');
  })

  router.post('/login', () =>
    {
      console.log('login post')
      return passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: 'User not found'
      })
    }
  )

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  })

}

module.exports = createLoginRoutes;
