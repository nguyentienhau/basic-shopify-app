"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const dateSample = new Date(0);

		await queryInterface.createTable("rq_variant", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			order_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			variant_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			price: {
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
		await queryInterface.dropTable("rq_variant");
	}
};
