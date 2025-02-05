"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		const tableName = "ag_user";
		const domains = ["test.example.com"];
		const users = domains.map((domain) => ({ domain, active: true, plan_id: 0 }));
		await queryInterface.bulkInsert(tableName, users, {});
	},
	async down(queryInterface, Sequelize) {
		const tableName = "ag_user";
		const domains = ["test.example.com"];
		const domainCondition = { [Sequelize.Op.in]: domains };
		await queryInterface.bulkDelete(tableName, { domain: domainCondition }, {});
	}
};
