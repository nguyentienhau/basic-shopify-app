"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	const modelName = "RqVariant";
	const tableName = modelName.toSnakeCase();
	const dateSample = new Date(0);

	class RqVariant extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	RqVariant.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			orderId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			variantId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: dateSample
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: dateSample
			}
		},
		{ sequelize, modelName, tableName, underscored: true }
	);

	return RqVariant;
};
