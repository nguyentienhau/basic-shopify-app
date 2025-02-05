"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class AgEmail extends Model {
		static associate(models) {
			this.belongsTo(models["AgUser"]);
		}
	}

	AgEmail.init(
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
			code: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			sendFrom: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			template: {
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
		{ sequelize, modelName: "AgEmail", tableName: "ag_email", underscored: true }
	);

	return AgEmail;
};
