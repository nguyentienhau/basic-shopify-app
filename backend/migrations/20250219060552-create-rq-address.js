"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("rq_address", {
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
				values: ["shipping", "billing"],
				defaultValue: "shipping"
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			address1: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			address2: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			company: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			province_code: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			zip: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			country_code: {
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
		await queryInterface.dropTable("rq_address");
	}
};
