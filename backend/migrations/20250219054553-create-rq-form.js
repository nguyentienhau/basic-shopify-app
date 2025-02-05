"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("rq_form", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			product_fields: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			form_fields: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			settings: {
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
		await queryInterface.dropTable("rq_form");
	}
};
