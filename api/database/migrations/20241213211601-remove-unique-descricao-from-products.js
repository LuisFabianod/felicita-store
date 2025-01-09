'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'descricao', {
      type: Sequelize.STRING,
      allowNull: false,  // Ou o que for necessário para a coluna
      unique: false  // Remover a restrição UNIQUE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'descricao', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true  // Restaurar a restrição UNIQUE, caso necessário
    });
  }
};
