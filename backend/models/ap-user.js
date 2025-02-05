"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	const modelName = "ApUser";
	const tableName = modelName.toSnakeCase();
	const dateSample = new Date(0);

	class ApUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	ApUser.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			domain: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			accessToken: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			planId: {
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

	return ApUser;
};
