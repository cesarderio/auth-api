'use strict';

require('dotenv').config();
const userModel = require('./users.js');
const { Sequelize, DataTypes } = require('sequelize');

// const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory:' : process.env.DATABSE_URL;

const sequelize = new Sequelize(DATABASE_URL);

const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const Collection = require('./data-collection.js');

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  // users: userModel(sequelize, DataTypes),
  food: new Collection(food),
  clothes: new Collection(clothes),
  users,
};
