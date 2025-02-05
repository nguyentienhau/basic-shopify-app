"use strict";

const shopify = require("../shopify");
const serviceMethods = ["read", "upsert", "delete"];
const requestPaths = [
	"/shopify/shop",
	"/shopify/product",
	"/shopify/collection",
	"/shopify/variant",
	"/shopify/draft-order",
	"/shopify/order"
];

module.exports = requestPaths.map(function (requestPath) {
	return {
		url: requestPath,
		handler: async function (request, response) {
			try {
				const service = require("services" + requestPath);
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
});
