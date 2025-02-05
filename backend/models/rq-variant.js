"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
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
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
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
				defaultValue: new Date(0)
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			}
		},
		{ sequelize, modelName: "RqVariant", tableName: "rq_variant", underscored: true }
	);

	return RqVariant;
};
