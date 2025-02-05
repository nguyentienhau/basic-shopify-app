"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqAddress extends Model {
		static associate(models) {
			this.belongsTo(models["RqOrder"]);
		}
	}

	RqAddress.init(
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
			type: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ["shipping", "billing"],
				defaultValue: "shipping"
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			address1: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			address2: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			company: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			provinceCode: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			zip: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			countryCode: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
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
		{ sequelize, modelName: "RqAddress", tableName: "rq_address", underscored: true }
	);

	return RqAddress;
};
