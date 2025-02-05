"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqRule extends Model {
		static associate(models) {
			this.belongsTo(models["AgUser"]);
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
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			generalSettings: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
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
			buttonSettings: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			buttonStyles: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			buttonCustomize: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			productAttributes: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			formElements: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			formSettings: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			formStyles: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			formCustomize: {
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
		{ sequelize, modelName: "RqRule", tableName: "rq_rule", underscored: true }
	);

	return RqRule;
};
