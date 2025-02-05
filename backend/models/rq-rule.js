"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	const modelName = "RqRule";
	const tableName = modelName.toSnakeCase();
	const dateSample = new Date(0);

	class RqRule extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	RqRule.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			priority: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			customerOption: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			customerIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			customerTags: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			productOption: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			variantIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			collectionIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			productTags: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
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

	return RqRule;
};
