"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("rq_order", {
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
			status: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			customer_email: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			customer_name: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			customer_message: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			draft_order_id: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
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
		await queryInterface.dropTable("rq_order");
	}
};
