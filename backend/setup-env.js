"use strict";

const environmentData = require("./env.json");

const numberKeys = [];
const booleanKeys = [];
const environmentKeyMap = { mode: "ENVIRONMENT" };

for (const key in environmentData) {
	process.env[key] = environmentData[key];
}

process.argv.reduce(function (item) {
	if (item && item.isString() && item.startsWith("--")) {
		const splitIndex = item.indexOf("=");

		if (splitIndex > 2 && splitIndex < item.length - 1) {
			const key = item.slice(2, splitIndex);
			const environmentKey = environmentKeyMap[key];
			let value = item.slice(splitIndex + 1);

			if (numberKeys.includes(environmentKey)) {
				value = Number(value);
			} else if (booleanKeys.includes(environmentKey)) {
				value = value === "true";
			}

			process.env[environmentKey] = value;
		}
	}
}, {});
