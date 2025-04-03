const { Sequelize } = require('sequelize');
const sequelize = require('../database/sequelize');

const User = require('./User');
const Product = require('./Product');
const Favorite = require('./Favorite');

User.belongsToMany(Product, { through: Favorite, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Favorite, foreignKey: 'productId' });

const models = { sequelize, User, Product, Favorite };

module.exports = models;
