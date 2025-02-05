"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const dateSample = new Date(0);

		await queryInterface.createTable("ap_user", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			domain: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			access_token: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			plan_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: dateSample
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: dateSample
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("ap_user");
	}
};
