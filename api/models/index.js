const { Sequelize } = require('sequelize');
const sequelize = require('../database/sequelize');

const User = require('./User');
const Product = require('./Product');
const Favorite = require('./Favorite');
const Section = require('./Section');

User.belongsToMany(Product, { through: Favorite, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Favorite, foreignKey: 'productId' });


Product.belongsToMany(Section, { through: 'ProductSection' });
Section.belongsToMany(Product, { through: 'ProductSection' });

const models = { sequelize, User, Product, Favorite, Section };

module.exports = models;
