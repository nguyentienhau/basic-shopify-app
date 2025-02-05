"use strict";

const serviceMethods = ["read", "upsert", "delete"];
const requestPaths = [
	"/app-general/user",
	"/app-general/discount",
	"/app-general/email",
	"/app-general/export",
	"/request-quote/rule",
	"/request-quote/order",
	"/request-quote/variant",
	"/request-quote/address",
	"/request-quote/log"
];

module.exports = requestPaths.map(function (requestPath) {
	return {
		url: requestPath,
		handler: async function (request, response) {
			try {
				const service = require("services" + requestPath);
				const { type = "read", ...requestData } = request.body;

				if (serviceMethods.includes(type)) {
					const result = await service[type](requestData);
					response.status(200).send(result);
				} else {
					response.status(200).send({ success: false, message: "Invalid type" });
				}
			} catch (error) {
				response.status(500).send({ success: false, error, message: "Handle failed" });
			}
		}
	};
});
