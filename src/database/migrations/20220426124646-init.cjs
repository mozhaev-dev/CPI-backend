'use strict';

// import { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface, sequelize) {
    const { DataTypes } = sequelize;

    await queryInterface.createTable('locations', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      long: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      raw: {
        type: DataTypes.JSONB,
      },
    });

    await queryInterface.createTable('operations', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      locationId: {
        type: DataTypes.STRING,
        references: { model: 'locations', key: 'id' },
        onDelete: 'set null',
        onUpdate: 'cascade',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('operations', {
      type: 'PRIMARY KEY',
      fields: ['id', 'date', 'name', 'location'],
      name: 'operations_pk',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('operations');
    await queryInterface.dropTable('locations');
  },
};
