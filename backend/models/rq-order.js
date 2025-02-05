"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqOrder extends Model {
		static associate(models) {
			const options = { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" };
			this.belongsTo(models["AgUser"]);
			this.hasMany(models["RqVariant"], options);
			this.hasMany(models["RqLog"], options);
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
			generalSettings: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			customerId: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			customerDetails: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			paymentSettings: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			shippingAddress: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
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
