const { BillingInterval } = require("@shopify/shopify-api");
const { shopifyApp } = require("@shopify/shopify-app-express");
const { SQLiteSessionStorage } = require("@shopify/shopify-app-session-storage-sqlite");
const { restResources } = require("@shopify/shopify-api/rest/admin/2024-10");

const DB_PATH = `${process.cwd()}/database.sqlite`;

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
	"My Shopify One-Time Charge": {
		// This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
		amount: 5.0,
		currencyCode: "USD",
		interval: BillingInterval.OneTime
	}
};

const shopify = shopifyApp({
	api: {
		apiVersion: "2024-10",
		restResources,
		future: {
			customerAddressDefaultFix: true,
			lineItemBilling: true,
			unstable_managedPricingSupport: true
		},
		billing: undefined // or replace with billingConfig above to enable example billing
	},
	auth: {
		path: "/api/auth",
		callbackPath: "/api/auth/callback"
	},
	webhooks: {
		path: "/api/webhooks"
	},
	// This should be replaced with your preferred storage strategy
	sessionStorage: new SQLiteSessionStorage(DB_PATH)
});

module.exports = shopify;
