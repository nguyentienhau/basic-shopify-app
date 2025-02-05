"use strict";

module.exports = {
	development: {
		username: "root",
		password: null,
		database: "portal_development",
		host: "127.0.0.1",
		dialect: "mysql",
		seederStorage: "sequelize",
		seederStorageTableName: "sequelize_seeder",
		define: {
			freezeTableName: true,
			underscored: true
		}
	},
	test: {
		username: "root",
		password: null,
		database: "portal_test",
		host: "127.0.0.1",
		dialect: "mysql",
		seederStorage: "sequelize",
		seederStorageTableName: "sequelize_seeder",
		define: {
			freezeTableName: true,
			underscored: true
		}
	},
	production: {
		username: "root",
		password: null,
		database: "portal_production",
		host: "127.0.0.1",
		dialect: "mysql",
		seederStorage: "sequelize",
		seederStorageTableName: "sequelize_seeder",
		define: {
			freezeTableName: true,
			underscored: true
		}
	}
};
