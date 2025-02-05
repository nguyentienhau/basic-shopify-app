"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ag_discount", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			user_option: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			user_ids: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			plan_ids: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			price_option: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			price_amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			start_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			},
			end_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			}
		});
	},
	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable("ag_discount");
	}
};
