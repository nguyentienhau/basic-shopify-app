"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class AgUser extends Model {
		static associate(models) {
			const options = { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" };
			this.belongsTo(models["AgPlan"]);
			this.hasMany(models["AgEmail"], options);
			this.hasMany(models["AgExport"], options);
			this.hasMany(models["RqRule"], options);
			this.hasMany(models["RqOrder"], options);
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
			token: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			planId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			chargeId: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			rechargeAt: {
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
		{ sequelize, modelName: "AgUser", tableName: "ag_user", underscored: true }
	);

	return AgUser;
};
