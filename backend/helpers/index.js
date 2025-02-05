"use strict";

const fs = require("fs");
const path = require("path");

// prettier-ignore
fs.readdirSync(__dirname).filter(function (fileName) {
	const extensionIndex = fileName.lastIndexOf(".");
	return fileName !== path.basename(__filename) && extensionIndex > 0 && extensionIndex < fileName.length - 1;
}).forEach(function (fileName) {
	const extensionIndex = fileName.lastIndexOf(".");
	const filePath = path.resolve(__dirname, fileName);
	const name = fileName.slice(0, extensionIndex).toCamelCase();
	module.exports[`${name}Helper`] = require(filePath);
});
