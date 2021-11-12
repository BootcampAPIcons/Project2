//import sequelize constructor
const Sequelize = require('sequelize');

require('dotenv').config();

//create connection to database, pass in username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3001
});

module.exports = sequelize;