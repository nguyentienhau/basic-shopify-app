const requestPaths = ["/general/users", "/general/user-modules", "/request-quote/rules", "/request-quote/orders", "/shopify/products"];

module.exports = requestPaths
	.map(function (requestPath) {
		const service = require("services" + requestPath);

		if (requestPath.startsWith("/shopify/")) {
			return [
				{
					method: "post",
					url: requestPath,
					handler: async function (request, response) {
						try {
							const result = await service.post(request.body);
							response.status(200).send(result);
						} catch (error) {
							response.status(500).send({ success: false, error, message: "Handle failed" });
						}
					}
				}
			];
		} else {
			return [
				{
					method: "patch",
					url: requestPath,
					handler: async function (request, response) {
						try {
							const result = await service.read(request.body);
							response.status(200).send(result);
						} catch (error) {
							response.status(500).send({ success: false, error, message: "Handle failed" });
						}
					}
				},
				{
					method: "post",
					url: requestPath,
					handler: async function (request, response) {
						try {
							const result = await service.upsert(request.body);
							response.status(200).send(result);
						} catch (error) {
							response.status(500).send({ success: false, error, message: "Handle failed" });
						}
					}
				},
				{
					method: "delete",
					url: requestPath,
					handler: async function (request, response) {
						try {
							const result = await service.delete(request.body);
							response.status(200).send(result);
						} catch (error) {
							response.status(500).send({ success: false, error, message: "Handle failed" });
						}
					}
				}
			];
		}
	})
	.flat();
