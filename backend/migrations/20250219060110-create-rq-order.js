"use strict";

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
			general_settings: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			customer_id: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			customer_details: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			payment_settings: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			shipping_address: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "{}"
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
