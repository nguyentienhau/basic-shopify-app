import * as serviceMap from "../services";

// const paths = ["/user-module", "/request-quote/rule", "/request-quote/order"];
const paths = [];

export default paths
	.map(function (path) {
		const service = serviceMap[path.toCamelCase() + "Service"];

		return [
			{
				method: "patch",
				path,
				handler: async function (request, response) {
					const result = await service.read(request.body);
					response.status(200).send(result);
				}
			},
			{
				method: "post",
				path,
				handler: async function (request, response) {
					const result = await service.upsert(request.body);
					response.status(200).send(result);
				}
			},
			{
				method: "delete",
				path,
				handler: async function (request, response) {
					const result = await service.delete(request.body);
					response.status(200).send(result);
				}
			}
		];
	})
	.flat();
