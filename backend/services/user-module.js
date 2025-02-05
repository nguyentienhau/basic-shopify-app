import { UserModule } from "../models";

export default {
	read: async function (data) {
		try {
			const response = { success: true, data: result, message: "Read successfully" };

			if (data.length > 0) {
				response.data = data
					.map(async function (item) {
						return await UserModule.findAll(item);
					})
					.flat();
			} else {
				response.data = await UserModule.findAll();
			}

			return response;
		} catch (error) {
			return { success: false, error, message: "Read failed" };
		}
	},
	upsert: async function (data) {
		try {
			const options = { updateOnDuplicate: ["id", "userId", "moduleId"] };
			const result = await UserModule.bulkCreate(data, options);
			return { success: true, data: result, message: "Save successfully" };
		} catch (error) {
			return { success: false, error, message: "Save failed" };
		}
	},
	delete: async function (data) {
		try {
			const result = data
				.map(async function (item) {
					return await UserModule.destroy(item);
				})
				.flat();
			return { success: true, data: result, message: "Delete successfully" };
		} catch (error) {
			return { success: false, error, message: "Delete failed" };
		}
	}
};
