"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("rq_rule", {
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
			button_settings: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			button_styles: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			button_customize: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			product_attributes: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			form_elements: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "[]"
			},
			form_settings: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			form_styles: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: "{}"
			},
			form_customize: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
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
		await queryInterface.dropTable("rq_rule");
	}
};
