"use strict";

const { Op } = require("sequelize");

module.exports = {
	createBasicServices(model) {
		return {
			read: async function (requestData = {}) {
				try {
					const { data = [] } = requestData;

					if (data && data.isArray()) {
						const options = { where: { [Op.or]: data } };
						const result = await model.findAll(options);
						return { success: true, data: result, message: "Read successfully" };
					} else {
						return { success: false, message: "Invalid data" };
					}
				} catch (error) {
					return { success: false, error, message: "Read failed" };
				}
			},
			upsert: async function (requestData = {}) {
				try {
					const { data = [] } = requestData;

					if (data && data.isArray()) {
						const options = { updateOnDuplicate: ["id"] };
						const result = await model.bulkCreate(data, options);
						return { success: true, data: result, message: "Save successfully" };
					} else {
						return { success: false, message: "Invalid data" };
					}
				} catch (error) {
					return { success: false, error, message: "Save failed" };
				}
			},
			delete: async function (requestData = {}) {
				try {
					const { data = [] } = requestData;

					if (data && data.isArray()) {
						const options = { where: { [Op.or]: data } };
						const result = await model.destroy(options);
						return { success: true, data: result, message: "Delete successfully" };
					} else {
						return { success: false, message: "Invalid data" };
					}
				} catch (error) {
					return { success: false, error, message: "Delete failed" };
				}
			}
		};
	},
	processShopifyConditions(conditions) {
		return conditions;
	}
};
