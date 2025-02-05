"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const dateSample = new Date(0);

		await queryInterface.createTable("rq_order", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			customer_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			status: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			draft_order_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			charge_tax: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			require_shipping: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			shipping_name: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			shipping_amount: {
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
		await queryInterface.dropTable("rq_order");
	}
};
