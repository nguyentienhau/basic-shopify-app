export const PlanDataMap = Object.freeze({
	0: { id: 0, code: "v1-free", name: "Free Plan" },
	1: { id: 1, code: "v1-starter", name: "Starter Plan" },
	2: { id: 2, code: "v1-advanced", name: "Advanced Plan" },
	3: { id: 3, code: "v1-premium", name: "Premium Plan" }
});

export const ModuleDataMap = Object.freeze({
	0: { id: 0, code: "request-quote", name: "Request Quote", planIds: [0, 1, 2, 3] },
	1: { id: 1, code: "pay-later", name: "Pay Later", planIds: [0, 1, 2, 3] },
	2: { id: 2, code: "quick-order", name: "Quick Order", planIds: [0, 1, 2, 3] },
	3: { id: 3, code: "company-account", name: "Company Account", planIds: [0, 1, 2, 3] },
	4: { id: 4, code: "sales-rep", name: "Sales Rep", planIds: [0, 1, 2, 3] }
});

export const RequestQuoteRule = Object.freeze({
	id: -1,
	name: "",
	priority: 0,
	status: false,
	customerOption: 0,
	customerIds: [],
	customerTags: [],
	productOption: 0,
	productIds: [],
	collectionIds: [],
	productTags: []
});

export const RequestQuoteOrder = Object.freeze({
	id: -1,
	customerId: 0,
	chargeTax: false,
	requireShipping: false,
	shippingName: "",
	shippingAmount: 0
});

export const RequestQuoteVariant = Object.freeze({
	id: -1,
	orderId: -1,
	productId: 0,
	variantId: 0,
	price: 0,
	quantity: 0
});

export const RequestQuoteAddress = Object.freeze({
	id: -1,
	orderId: -1,
	type: "shipping",
	phone: "",
	address: "",
	apartment: "",
	province: "",
	state: "",
	country: ""
});
