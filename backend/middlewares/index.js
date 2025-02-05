"use strict";

const fs = require("fs");
const path = require("path");

// prettier-ignore
module.exports = fs.readdirSync(__dirname).filter(function (fileName) {
	return fileName !== path.basename(__filename);
}).reduce(function (accumulator, fileName) {
	const filePath = path.resolve(__dirname, fileName);
	const data = require(filePath);
	return { ...accumulator, ...data };
}, {});
