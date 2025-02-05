"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqButton extends Model {
		static associate(models) {
			this.belongsTo(models["RqRule"]);
		}
	}

	RqButton.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			ruleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			settings: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
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
		{ sequelize, modelName: "RqButton", tableName: "rq_button", underscored: true }
	);

	return RqButton;
};
