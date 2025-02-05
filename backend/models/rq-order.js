"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	const modelName = "RqOrder";
	const tableName = modelName.toSnakeCase();
	const dateSample = new Date(0);

	class RqOrder extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	RqOrder.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			customerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			draftOrderId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			chargeTax: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			requireShipping: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			shippingName: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			shippingAmount: {
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

	return RqOrder;
};
