'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      place_id: {
        type: Sequelize.INTEGER,
        references: {
          allowNull: false,
          model: {
            tableName: 'Places',
          },
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          allowNull: false,
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      check_in: {
        type: Sequelize.DATE,
      },
      check_out: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  },
};
