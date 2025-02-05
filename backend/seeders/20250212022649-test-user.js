"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const domains = ["test.example.com"];
		const users = domains.map((domain) => ({ domain, active: true, plan_id: 0 }));
		await queryInterface.bulkInsert("ap_user", users, {});
	},
	async down(queryInterface, Sequelize) {
		const domains = ["test.example.com"];
		const domainCondition = { [Sequelize.Op.in]: domains };
		await queryInterface.bulkDelete("ap_user", { domain: domainCondition }, {});
	}
};
