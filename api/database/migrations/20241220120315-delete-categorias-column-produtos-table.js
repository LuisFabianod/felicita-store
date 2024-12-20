'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'categoria');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'categoria', {
      type: Sequelize.DataTypes.JSON,
      allowNull: false
  });
  }
};

