// @ts-check
"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
require("./custom");
require("./setup-env");
const shopify = require("./shopify.js");
const productCreator = require("./product-creator.js");
const PrivacyWebhookHandlers = require("./privacy.js");
const routes = require("./routes");

process.env.NODE_PATH = __dirname;
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || 3000, 10);
const STATIC_PATH = process.env.ENVIRONMENT === "production" ? `${process.cwd()}/../frontend/dist` : `${process.cwd()}/../frontend/`;
const STATIC_PATH_PROXY = process.env.ENVIRONMENT === "production" ? `${process.cwd()}/../proxy/dist` : `${process.cwd()}/../proxy/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(shopify.config.auth.callbackPath, shopify.auth.callback(), shopify.redirectToShopifyOrAppRoot());
app.post(shopify.config.webhooks.path, shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers }));

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.post("/api/products/count", async (_request, response) => {
	const client = new shopify.api.clients.Graphql({
		session: response.locals.shopify.session
	});

	const countData = await client.request(`
		query shopifyProductCount {
			productsCount {
				count
			}
		}
	`);

	response.status(200).send({ success: true, count: countData.data.productsCount.count, session: response.locals });
});

routes.forEach(function (route) {
	app.post("/api" + route.url, route.handler);
});

app.post("/api/products", async (_request, response) => {
	let status = 200;
	let error = null;

	try {
		await productCreator(response.locals.shopify.session);
	} catch (e) {
		console.log(`Failed to process products/create: ${e.message}`);
		status = 500;
		error = e.message;
	}
	response.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/proxy/*", shopify.ensureInstalledOnShop(), async function (_request, response, _next) {
	const filePath = path.resolve(STATIC_PATH_PROXY, "index.html");
	const fileDataString = fs.readFileSync(filePath).toString();
	const result = fileDataString.replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "");
	return response.status(200).set("Content-Type", "text/html").send(result);
});

app.use("/*", shopify.ensureInstalledOnShop(), async function (_request, response, _next) {
	const filePath = path.resolve(STATIC_PATH, "index.html");
	const fileDataString = fs.readFileSync(filePath).toString();
	const result = fileDataString.replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "");
	return response.status(200).set("Content-Type", "text/html").send(result);
});

app.listen(PORT);
