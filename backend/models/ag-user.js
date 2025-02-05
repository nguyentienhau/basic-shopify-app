"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class AgUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	AgUser.init(
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
				defaultValue: new Date(0)
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			}
		},
		{ sequelize, modelName: "AgUser", tableName: "ag_user", underscored: true }
	);

	return AgUser;
};
