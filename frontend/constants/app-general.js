export const Plans = Object.freeze({
	0: { id: 0, code: "v1-free", name: "Free Plan" },
	1: { id: 1, code: "v1-starter", name: "Starter Plan" },
	2: { id: 2, code: "v1-advanced", name: "Advanced Plan" },
	3: { id: 3, code: "v1-premium", name: "Premium Plan" }
});

export const Modules = Object.freeze({
	0: { id: 0, code: "request-quote", name: "Request Quote", planIds: [0, 1, 2, 3] },
	1: { id: 1, code: "pay-later", name: "Pay Later", planIds: [0, 1, 2, 3] },
	2: { id: 2, code: "quick-order", name: "Quick Order", planIds: [0, 1, 2, 3] },
	3: { id: 3, code: "company-account", name: "Company Account", planIds: [0, 1, 2, 3] },
	4: { id: 4, code: "sales-rep", name: "Sales Rep", planIds: [0, 1, 2, 3] }
});
