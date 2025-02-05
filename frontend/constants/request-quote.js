const dateSample = new Date(0);

export const RqRuleSample = Object.freeze({
	id: 0,
	userId: 0,
	generalSettings: {},
	customerOption: 0,
	customerIds: [],
	customerTags: [],
	productOption: 0,
	variantIds: [],
	collectionIds: [],
	productTags: [],
	buttonSettings: {},
	buttonStyles: {},
	buttonCustomize: "",
	productAttributes: [],
	formElements: [],
	formSettings: {},
	formStyles: {},
	formCustomize: "",
	createdAt: dateSample,
	updatedAt: dateSample
});

export const RqOrderSample = Object.freeze({
	id: 0,
	userId: 0,
	generalSettings: {},
	customerId: "",
	customerDetails: {},
	paymentSettings: {},
	shippingAddress: {},
	createdAt: dateSample,
	updatedAt: dateSample
});

export const RqVariantSample = Object.freeze({
	id: 0,
	orderId: 0,
	variantId: "",
	price: 0,
	quantity: 0,
	createdAt: dateSample,
	updatedAt: dateSample
});

export const RqLogSample = Object.freeze({
	id: 0,
	orderId: 0,
	type: "status",
	content: "",
	createdAt: dateSample,
	updatedAt: dateSample
});
