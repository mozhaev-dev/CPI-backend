'use strict';

module.exports = {
  async up(queryInterface, sequelize) {
    const { DataTypes } = sequelize;

    await queryInterface.createTable('locations', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      placeId: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      long: {
        type: DataTypes.FLOAT,
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

      locationId: {
        type: DataTypes.INTEGER,
        references: { model: 'locations', key: 'id' },
        onDelete: 'cascade',
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
      fields: ['id', 'date', 'name', 'locationId'],
      name: 'operations_pk',
    });

    await queryInterface.createTable('locationsEnrichmentTasks', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'locations', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('operations');
    await queryInterface.dropTable('locationsEnrichmentTasks');
    await queryInterface.dropTable('locations');
  },
};
