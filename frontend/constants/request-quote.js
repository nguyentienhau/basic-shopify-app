const dateSample = new Date(0);

export const RqRule = Object.freeze({
	id: 0,
	userId: 0,
	name: "",
	priority: 0,
	status: false,
	customerOption: 0,
	customerEmails: [],
	customerTags: [],
	productOption: 0,
	variantIds: [],
	collectionIds: [],
	productTags: [],
	createdAt: dateSample,
	updatedAt: dateSample
});

export const RqOrder = Object.freeze({
	id: 0,
	userId: 0,
	customerEmail: "",
	customerName: "",
	customerMessage: "",
	chargeTax: false,
	requireShipping: false,
	shippingName: "",
	shippingAmount: 0,
	createdAt: dateSample,
	updatedAt: dateSample
});

export const RqVariant = Object.freeze({
	id: 0,
	orderId: 0,
	variantId: 0,
	price: 0,
	quantity: 0,
	createdAt: dateSample,
	updatedAt: dateSample
});

export const RqAddress = Object.freeze({
	id: 0,
	orderId: 0,
	type: "shipping",
	phone: "",
	address1: "",
	address2: "",
	company: "",
	city: "",
	provinceCode: "",
	zip: "",
	countryCode: "",
	createdAt: dateSample,
	updatedAt: dateSample
});

export const RqLog = Object.freeze({
	id: 0,
	orderId: 0,
	type: "status",
	content: "",
	createdAt: dateSample,
	updatedAt: dateSample
});

export const RqEmail = Object.freeze({
	id: 0,
	userId: 0,
	status: false,
	sendFrom: "",
	template: "",
	createdAt: dateSample,
	updatedAt: dateSample
});
