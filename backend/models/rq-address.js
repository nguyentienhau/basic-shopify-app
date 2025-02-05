"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	const modelName = "RqAddress";
	const tableName = modelName.toSnakeCase();
	const dateSample = new Date(0);

	class RqAddress extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
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

	return RqAddress;
};
