"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqForm extends Model {
		static associate(models) {
			this.belongsTo(models["RqRule"]);
		}
	}

	RqForm.init(
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
			productFields: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			formFields: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
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
		{ sequelize, modelName: "RqForm", tableName: "rq_form", underscored: true }
	);

	return RqForm;
};
