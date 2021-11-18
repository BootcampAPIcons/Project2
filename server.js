const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({});
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');

const models = require('./models');

require('dotenv').config();


passport.use(new LocalStrategy((username, password, done) => {
  models.User.findOne({username: username}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, {message: "Incorrect username."});
    if (!user.checkPassword(password)) return done(null, false, {message: "Incorrect password."});
    return done(null, user);
  })
}));

const sess = {
  secret: process.env.Sess_Secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});