const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }

    static async exists(username, email) {
      console.log('start of User.exists()');
      let user = await this.findOne({
        where: {username}
      });
      console.log(`user: ${user}`);
      if (user) return {username: "This username is already in use"};
      user = await this.findOne({
        where: {email}
      });
      console.log(`user: ${user}`);
      if (user) return {email: "This email address is already in use"};
      return false;
    }

    static async authenticate(username, pass) {
      let user = await this.findOne({email: username});
      if (user && checkPassword(pass)) return user;
      return false;
    }
}


User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true
        }
      },
      character_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true
        }
      }
    },
    {
      hooks: {
    // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );

module.exports = User;