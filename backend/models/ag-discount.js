"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class AgDiscount extends Model {
		static associate(_models) {}
	}

	AgDiscount.init(
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
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			userOption: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			userIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			planIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			priceOption: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			priceAmount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			startAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			},
			endAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(0)
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
		{ sequelize, modelName: "AgDiscount", tableName: "ag_discount", underscored: true }
	);

	return AgDiscount;
};
