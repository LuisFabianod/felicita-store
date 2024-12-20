'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('products', 'tabelaMedidas', {
        type: Sequelize.DataTypes.JSON,
        allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'tabelaMedidas');
  }
};
