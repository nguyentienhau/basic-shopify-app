const Portal = { general: {}, requestQuote: {}, payLater: {} };

Portal.general.customer = {};

Portal.general.quickViewButtonSelector = [].join(",");

Portal.general.quickViewPositionSelector = [].join(" [portal-product-id],");

Portal.general.cartDrawerButtonSelector = [].join(",");

Portal.general.cartDrawerPositionSelector = [].join(",");

Portal.general.cartPagePositionSelector = [].join(",");

Portal.requestQuote.rules = [];

Portal.requestQuote.validateRule = function (rule) {
	return (
		rule &&
		rule.id >= 0 &&
		rule.name?.length > 0 &&
		rule.priority >= 0 &&
		rule.customerOption >= 0 &&
		Array.isArray(rule.customerIds) &&
		Array.isArray(rule.customerTags) &&
		rule.productOption > 0 &&
		Array.isArray(rule.productIds) &&
		Array.isArray(rule.collectionIds) &&
		Array.isArray(rule.productTags)
	);
};

Portal.requestQuote.validateCustomer = function (customer) {
	return customer && customer.id && Array.isArray(customer.tags);
};

Portal.requestQuote.validateProduct = function (product) {
	return product && product.id && Array.isArray(product.collections) && Array.isArray(product.tags);
};

Portal.requestQuote.checkCustomer = function (rule, customer) {
	const { validateRule, validateCustomer } = Portal.requestQuote;

	if (validateRule(rule) && validateCustomer(customer)) {
		switch (rule.customerOption) {
			case 0: {
				return true;
			}
			case 1: {
				return !!customer.id;
			}
			case 2: {
				return rule.customerIds.includes(customer.id);
			}
			case 3: {
				return rule.customerTags.some((tag) => customer.tags.includes(tag));
			}
			default: {
				return false;
			}
		}
	} else {
		return false;
	}
};

Portal.requestQuote.checkProduct = function (rule, product) {
	const { validateRule, validateProduct } = Portal.requestQuote;

	if (validateRule(rule) && validateProduct(product)) {
		switch (rule.productOption) {
			case 0: {
				return true;
			}
			case 1: {
				return rule.productIds.includes(product.id);
			}
			case 2: {
				return rule.collectionIds.some((id) => product.collections.includes(id));
			}
			case 3: {
				return rule.productTags.some((tag) => product.tags.includes(tag));
			}
			default: {
				return false;
			}
		}
	} else {
		return false;
	}
};

Portal.requestQuote.insertButton = function (position, data) {
	const key = "request-quote-data";
	const url = "/apps/customer-portal/request-quote/add?tab=1";
	const button = document.createElement("button");
	button.innerText = "Add To Quote";
	button.onclick = function () {
		const oldDataString = localStorage.getItem(key) || "[]";
		const oldData = JSON.parse(oldDataString);
		const newData = oldData.concat(data);
		const newDataString = JSON.parse(newData);
		localStorage.setItem(key, newDataString);
		location.href = url;
	};
};

Portal.requestQuote.showProductButton = async function (positionSelector) {
	const { rules, checkCustomer, checkProduct, insertButton } = Portal.requestQuote;
	const { customer } = Portal.general;
	const validCustomerRules = rules.filter((rule) => checkCustomer(rule, customer));

	if (validCustomerRules.length > 0) {
		const buttonPositions = document.querySelectorAll(positionSelector);
		const productDataList = [];

		buttonPositions.forEach(function (buttonPosition) {
			const productId = buttonPosition.getAttribute("portal-product-id");
			productId ? productDataList.push({ productId, buttonPosition }) : null;
		});

		const condition = productDataList.map((data) => data.productId).join("OR");
		const response = await fetch("/search.js?view=search.portal&" + condition);
		const products = response
			.filter(function (item) {
				return item && item.id;
			})
			.map(function (item) {
				return { ...item };
			});

		productDataList.forEach(function (productData) {
			const { productId, buttonPosition } = productData;
			const product = products.find((item) => item.id === productId);
			const validRules = validCustomerRules.filter((rule) => checkProduct(rule, product));
			validRules.length > 0 ? insertButton(buttonPosition, [productId]) : null;
		});
	}
};

Portal.requestQuote.showCartButton = async function (positionSelector) {
	const { rules, checkCustomer, checkProduct, insertButton } = Portal.requestQuote;
	const { customer } = Portal.general;
	const validCustomerRules = rules.filter((rule) => checkCustomer(rule, customer));

	if (validCustomerRules.length > 0) {
		const buttonPositions = document.querySelectorAll(positionSelector);
		const response = await fetch("/cart.js");
		const productIds = response.lineItems
			.filter(function (lineItem) {
				if (lineItem) {
					const data = { id: lineItem.productId, collections: lineItem.collections, tags: lineItem.tags };
					return validCustomerRules.some((rule) => checkProduct(rule, data));
				} else {
					return false;
				}
			})
			.map((lineItem) => lineItem.productId);
		buttonPositions.forEach((buttonPosition) => insertButton(buttonPosition, productIds));
	}
};

Portal.requestQuote.init = function () {
	document.addEventListener("DOMContentLoaded", function () {
		const {
			quickViewButtonSelector,
			quickViewPositionSelector,
			cartDrawerButtonSelector,
			cartDrawerPositionSelector,
			cartPagePositionSelector,
			showProductButton,
			showCartButton
		} = Portal.requestQuote;
		const quickViewButtons = document.querySelectorAll(quickViewButtonSelector);
		const cartDrawerButtons = document.querySelectorAll(cartDrawerButtonSelector);

		showProductButton("[portal-product-id]");

		quickViewButtons.forEach(function (button) {
			button.addEventListener("click", function () {
				showProductButton(quickViewPositionSelector);
			});
		});

		cartDrawerButtons.forEach(function (button) {
			button.addEventListener("click", function () {
				showCartButton(cartDrawerPositionSelector);
			});
		});

		if (location.pathname.includes("/cart")) {
			showCartButton(cartPagePositionSelector);
		}
	});
};
