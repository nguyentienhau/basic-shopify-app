"use strict";

module.exports = {
	async up(queryInterface, _Sequelize) {
		const tableName = "ag_module";
		const rows = [
			{ code: "request-quote", name: "Request Quote" },
			{ code: "pay-later", name: "Pay Later" },
			{ code: "quick-order", name: "Quick Order" },
			{ code: "company-account", name: "Company Account" },
			{ code: "sales-rep", name: "Sales Rep" }
		];
		await queryInterface.bulkInsert(tableName, rows, {});
	},
	async down(queryInterface, Sequelize) {
		const tableName = "ag_module";
		const codes = ["request-quote", "pay-later", "quick-order", "company-account", "sales-rep"];
		await queryInterface.bulkDelete(tableName, { code: { [Sequelize.Op.in]: codes } }, {});
	}
};
