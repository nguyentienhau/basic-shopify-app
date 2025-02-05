"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const dateSample = new Date(0);

		await queryInterface.createTable("rq_rule", {
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
			priority: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			customer_option: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			customer_ids: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			customer_tags: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			product_option: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			variant_ids: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			collection_ids: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			product_tags: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
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
		await queryInterface.dropTable("rq_rule");
	}
};
