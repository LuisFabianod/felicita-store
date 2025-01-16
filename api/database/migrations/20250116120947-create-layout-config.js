module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('layout_config', {
      imagens: {
        type: Sequelize.STRING,
        allowNull: false
    },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('layout_config');
  }
};
