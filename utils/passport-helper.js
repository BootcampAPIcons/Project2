const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models');

module.exports = (app, passport) => {
  passport.use(new LocalStrategy((email, password, done) => {

    User.authenticate(email, password)
    .then(user => {done(null, user)})
    .catch(err => {done(err)});

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findByPk(id).then(user => {
        done(null, user);
      })
      .catch(err => done(err));
    });
  }));

  app.use(passport.initialize());
  app.use(passport.session());
}
