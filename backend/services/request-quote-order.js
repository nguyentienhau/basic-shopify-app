import { RequestQuoteOrder, RequestQuoteVariant, RequestQuoteAddress } from "../models";

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

			response.data = response.data
				.filter((order) => order)
				.map(async function (order) {
					const condition = { orderId: order.id };
					const [variants, addresses] = await Promise.all([RequestQuoteVariant.findAll(condition), RequestQuoteAddress.findAll(condition)]);
					return { order, variants, addresses };
				});

			return response;
		} catch (error) {
			return { success: false, error, message: "Read failed" };
		}
	},
	upsert: async function (data) {
		try {
			const result = data.map(async function (item) {
				const { variants, addresses, ...order } = item;
				const orderResult = await RequestQuoteOrder.upsert(order);
				const changeOrderId = (item) => ({ ...item, orderId: orderResult.id });
				const variantData = variants && variants.isArray() ? variants.map(changeOrderId) : [];
				const addressData = addresses && addresses.isArray() ? addresses.map(changeOrderId) : [];
				const options = { updateOnDuplicate: ["id", "orderId"] };
				const [variantResult, addressResult] = await Promise.all([
					RequestQuoteVariant.bulkCreate(variantData, options),
					RequestQuoteAddress.bulkCreate(addressData, options)
				]);
				return { ...orderResult, variants: variantResult, addresses: addressResult };
			});
			return { success: true, data: result, message: "Save successfully" };
		} catch (error) {
			return { success: false, error, message: "Save failed" };
		}
	},
	delete: async function (data) {
		try {
			const result = data
				.map(async function (item) {
					const orders = await RequestQuoteOrder.findAll(item);
					return orders
						.filter((order) => order)
						.map(async function (order) {
							const condition = { orderId: order.id };
							await Promise.all([
								RequestQuoteOrder.destroy(order),
								RequestQuoteVariant.destroy(condition),
								RequestQuoteAddress.destroy(condition)
							]);
							return { order };
						});
				})
				.flat();
			return { success: true, data: result, message: "Delete successfully" };
		} catch (error) {
			return { success: false, error, message: "Delete failed" };
		}
	}
};
