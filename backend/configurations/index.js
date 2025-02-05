"use strict";

const fs = require("fs");
const path = require("path");

// prettier-ignore
module.exports = fs.readdirSync(__dirname).filter(function (fileName) {
	return fileName !== path.basename(__filename);
}).reduce(function (accumulator, fileName) {
	const extensionIndex = fileName.lastIndexOf(".");
	const filePath = path.resolve(__dirname, fileName);
	const name = fileName.slice(0, extensionIndex).replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
	accumulator[`${name}Configurations`] = require(filePath);
	return accumulator;
}, {});
