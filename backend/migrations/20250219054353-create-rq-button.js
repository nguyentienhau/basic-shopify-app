"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("rq_button", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			rule_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
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
		await queryInterface.dropTable("rq_button");
	}
};
