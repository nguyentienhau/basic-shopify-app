"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ag_user_module", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			module_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
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
		await queryInterface.dropTable("ag_user_module");
	}
};
