"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const dateSample = new Date(0);

		await queryInterface.createTable("ap_user_module", {
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
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: dateSample
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: dateSample
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("ap_user_module");
	}
};
