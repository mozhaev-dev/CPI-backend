'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('operations', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        location: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        amount: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
        wallet: {
          type: Sequelize.STRING,
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      });

      await queryInterface.addConstraint('operations', {
        fields: ['id', 'date', 'name', 'location'],
        type: 'primary key',
        name: 'operations_pk'
      });

      await transaction.commit();
    } catch (e) {
      console.error(e)
      await transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('operations');
  }
};
