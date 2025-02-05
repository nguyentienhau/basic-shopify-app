import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TextField, Icon } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { requestHelper } from "@/helpers";
import { ProductIdPrefix, VariantIdPrefix } from "@/constants";

function getSelectionIds(data) {
	const variantIdsMap = {};

	data.forEach(function (item) {
		const productId = ProductIdPrefix + item.productId;
		const variantId = VariantIdPrefix + item.variantId;
		const variantIds = variantIdsMap[productId] || [];

		if (!variantIds.includes(variantId)) {
			variantIdsMap[productId] = variantIds.concat(variantId);
		}
	});

	return Object.entries(variantIdsMap).map(function (variantIdsEntry) {
		const [productId, variantIds] = variantIdsEntry;
		return { id: productId, variants: variantIds.map((id) => ({ id })) };
	});
}

export function VariantPicker({ value = [], onChange = () => {} }) {
	const shopify = useAppBridge();
	const [selectionIds, setSelectionIds] = useState([]);

	const fetchData = useCallback(
		async function () {
			const condition = { ids: value };
			const response = await requestHelper.patch("/shopify/variant", { condition });

			if (response.success) {
				const selectionIds = response.data
					.reduce(function (accumulator, variant) {
						const productId = variant.product.id;
						const variants = accumulator.has(productId) ? accumulator.get(productId).variants : [];
						const newData = { id: productId, variants: variants.concat({ id: variant.id }) };
						accumulator.set(productId, newData);
						return accumulator;
					}, new Map())
					.values();
				setSelectionIds(selectionIds);
			}
		},
		[value]
	);

	const handleProductModalOpen = useCallback(
		async function () {
			const filter = { hidden: true, variants: true };
			const selectionIds = getSelectionIds(selectedVariants);
			const products = await shopify.resourcePicker({ type: "product", filter, multiple: true, action: "select", selectionIds });

			if (products) {
				const newValue = products
					.map(function (product) {
						const productId = product.id.replace(ProductIdPrefix, "");
						return product.variants.map(function (variant) {
							const variantId = variant.id.replace(VariantIdPrefix, "");
							return { productId, variantId };
						});
					})
					.flat();
				onChange(newValue);
			}
		},
		[onChange, selectedVariants]
	);

	useEffect(
		function () {
			fetchData();
		},
		[value]
	);

	return <TextField placeholder="Search products" prefix={<Icon source={SearchIcon} />} onFocus={handleProductModalOpen} />;
}

VariantPicker.propTypes = {
	value: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func
};
