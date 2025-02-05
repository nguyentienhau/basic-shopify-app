import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TextField, Icon } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { requestHelper } from "@/helpers";

const defaultProps = { value: [], onChange: (value) => console.log(value), setData: (data) => console.log(data) };
const filter = { hidden: true, variants: true };
const configuration = { type: "product", filter, multiple: true, action: "select" };
const productIdPrefix = "gid://shopify/Product/";
const variantIdPrefix = "gid://shopify/ProductVariant/";

function getSelectionIds(data) {
	const variantIdsMap = {};

	data.forEach(function (item) {
		const productId = productIdPrefix + item.productId;
		const variantId = variantIdPrefix + item.variantId;
		const variantIds = variantIdsMap[productId] || [];

		if (!variantIds.includes(variantId)) {
			variantIdsMap[productId] = variantIds.concat(variantId);
		}
	});

	return Object.entries(variantIdsMap).map(function (variantIdsEntry) {
		const [productId, variantIds] = variantIdsEntry;
		return {
			id: productId,
			variants: variantIds.map((id) => {
				id;
			})
		};
	});
}

export function VariantPicker(props = defaultProps) {
	const shopify = useAppBridge();
	const { value, onChange } = { ...defaultProps, ...props };
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
			const selectionIds = getSelectionIds(selectedVariants);
			const products = await shopify.resourcePicker({ ...configuration, selectionIds });

			if (products) {
				const newValue = products
					.map(function (product) {
						const productId = product.id.replace(productIdPrefix, "");
						return product.variants.map(function (variant) {
							const variantId = variant.id.replace(variantIdPrefix, "");
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
	onChange: PropTypes.func,
	setData: PropTypes.func
};
