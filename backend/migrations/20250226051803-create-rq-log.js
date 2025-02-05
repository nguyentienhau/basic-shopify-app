"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("rq_log", {
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
			type: {
				type: Sequelize.ENUM,
				allowNull: false,
				values: ["status", "variant", "customer", "address"],
				defaultValue: "status"
			},
			content: {
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
		await queryInterface.dropTable("rq_log");
	}
};
