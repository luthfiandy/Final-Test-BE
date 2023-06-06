'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      tanggal_Lahir: {
        type: Sequelize.STRING
      },
      tempat_Lahir: {
        type: Sequelize.STRING
      },
      kelas: {
        type: Sequelize.INTEGER
      },
      no_Hp: {
        type: Sequelize.INTEGER
      },
      nama_Ortu: {
        type: Sequelize.STRING
      },
      no_Hp_Ortu: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('siswas');
  }
};