"use strict";

const { Op } = require("sequelize");

module.exports = {
	createBasicService(model) {
		return {
			read: async function (data) {
				try {
					const options = { where: { [Op.or]: data } };
					const result = await model.findAll(options);
					return { success: true, data: result, message: "Read successfully" };
				} catch (error) {
					return { success: false, error, message: "Read failed" };
				}
			},
			upsert: async function (data) {
				try {
					const options = { updateOnDuplicate: ["id"] };
					const result = await model.bulkCreate(data, options);
					return { success: true, data: result, message: "Save successfully" };
				} catch (error) {
					return { success: false, error, message: "Save failed" };
				}
			},
			delete: async function (data) {
				try {
					const options = { where: { [Op.or]: data } };
					const result = await model.destroy(options);
					return { success: true, data: result, message: "Delete successfully" };
				} catch (error) {
					return { success: false, error, message: "Delete failed" };
				}
			}
		};
	}
};
