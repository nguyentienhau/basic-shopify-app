"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqOrder extends Model {
		static associate(models) {
			const options = { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" };
			this.belongsTo(models["AgUser"]);
			this.hasMany(models["RqVariant"], options);
			this.hasMany(models["RqAddress"], options);
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
