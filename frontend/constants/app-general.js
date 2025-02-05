export const Plans = Object.freeze({
	1: { id: 1, code: "v1-free", name: "Free Plan" },
	2: { id: 2, code: "v1-starter", name: "Starter Plan" },
	3: { id: 3, code: "v1-advanced", name: "Advanced Plan" },
	4: { id: 4, code: "v1-premium", name: "Premium Plan" }
});

export const Modules = Object.freeze({
	1: { id: 1, code: "request-quote", name: "Request Quote", planIds: [1, 2, 3, 4] },
	2: { id: 2, code: "pay-later", name: "Pay Later", planIds: [1, 2, 3, 4] },
	3: { id: 3, code: "quick-order", name: "Quick Order", planIds: [1, 2, 3, 4] },
	4: { id: 4, code: "company-account", name: "Company Account", planIds: [1, 2, 3, 4] },
	5: { id: 5, code: "sales-rep", name: "Sales Rep", planIds: [1, 2, 3, 4] }
});
