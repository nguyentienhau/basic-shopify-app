"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class AgPlan extends Model {
		static associate(_models) {}
	}

	AgPlan.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			code: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			version: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1
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
		{ sequelize, modelName: "AgPlan", tableName: "ag_plan", underscored: true }
	);

	return AgPlan;
};
