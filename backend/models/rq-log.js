"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqLog extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	RqLog.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			orderId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			type: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ["status", "variant", "customer", "address"],
				defaultValue: "status"
			},
			content: {
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
		{ sequelize, modelName: "RqLog", tableName: "rq_log", underscored: true }
	);

	return RqLog;
};
