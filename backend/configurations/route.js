"use strict";

const shopify = require("shopify");
const serviceMethods = ["read", "upsert", "delete"];
const requestPaths = [
	"/app-general/users",
	"/app-general/user-modules",
	"/request-quote/rules",
	"/request-quote/orders",
	"/shopify/shops",
	"/shopify/products"
];

module.exports = requestPaths.map(function (requestPath) {
	const service = require("services" + requestPath);

	if (requestPath.startsWith("/shopify/")) {
		return {
			url: requestPath,
			handler: async function (request, response) {
				try {
					const { type = "read", ...requestData } = request.body;

					if (serviceMethods.includes(type)) {
						const session = response.locals.shopify.session;
						const client = new shopify.api.clients.Graphql({ session });
						const result = await service[type](client, requestData);
						response.status(200).send(result);
					} else {
						response.status(200).send({ success: false, message: "Invalid type" });
					}
				} catch (error) {
					response.status(500).send({ success: false, error, message: "Handle failed" });
				}
			}
		};
	} else {
		return {
			url: requestPath,
			handler: async function (request, response) {
				try {
					const { type = "read", data } = request.body;

					if (serviceMethods.includes(type)) {
						const result = await service[type](data);
						response.status(200).send(result);
					} else {
						response.status(200).send({ success: false, message: "Invalid type" });
					}
				} catch (error) {
					response.status(500).send({ success: false, error, message: "Handle failed" });
				}
			}
		};
	}
});
