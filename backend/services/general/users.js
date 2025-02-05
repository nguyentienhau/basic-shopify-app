const { ApUser } = require("models");
const { sequelizeHelper } = require("helpers");

module.exports = {
	read: async function (data, conditions) {
		try {
			const response = { success: true, data: [], message: "Read successfully" };

			if (data.length > 0) {
				response.data = data
					.map(async function (item) {
						return await ApUser.findAll(item);
					})
					.flat();
			} else {
				response.data = await ApUser.findAll();
			}

			return response;
		} catch (error) {
			return { success: false, error, message: "Read failed" };
		}
	},
	upsert: async function (data, conditions) {
		try {
			const options = { updateOnDuplicate: ["id", "userId", "moduleId"] };
			const result = await ApUser.bulkCreate(data, options);
			return { success: true, data: result, message: "Save successfully" };
		} catch (error) {
			return { success: false, error, message: "Save failed" };
		}
	},
	delete: async function (data, conditions) {
		try {
			const sequelizeConditions = {};
			const result = data
				.map(async function (item) {
					return await ApUser.destroy(item);
				})
				.flat();
			return { success: true, data: result, message: "Delete successfully" };
		} catch (error) {
			return { success: false, error, message: "Delete failed" };
		}
	}
};
