"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
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
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			customerId: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			customerEmail: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			customerName: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			customerMessage: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			draftOrderId: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
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
				defaultValue: new Date(0)
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			}
		},
		{ sequelize, modelName: "RqOrder", tableName: "rq_order", underscored: true }
	);

	return RqOrder;
};
