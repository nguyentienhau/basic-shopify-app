"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const environment = process.env.ENVIRONMENT || "development";
const configuration = require("configurations").databaseConfigurations[environment];
const database = { Sequelize, sequelize: new Sequelize(configuration) };

// prettier-ignore
fs.readdirSync(__dirname).filter(function (fileName) {
	return fileName !== path.basename(__filename);
}).forEach(function (fileName) {
	const filePath = path.resolve(__dirname, fileName);
	const model = require(filePath)(database.sequelize);
	database[model.name] = model;
});

Object.keys(database).forEach(function (modelName) {
	if (database[modelName].associate) {
		database[modelName].associate(database);
	}
});

module.exports = database;
