"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	const modelName = "ApUserModule";
	const tableName = modelName.toSnakeCase();
	const dateSample = new Date(0);

	class ApUserModule extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	ApUserModule.init(
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
			moduleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: dateSample
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: dateSample
			}
		},
		{ sequelize, modelName, tableName, underscored: true }
	);

	return ApUserModule;
};
