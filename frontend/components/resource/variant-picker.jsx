import PropTypes from "prop-types";
import { useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TextField, Icon } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";

const defaultProps = { value: [], onChange: (value) => console.log(value) };
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

	const handleProductModalOpen = useCallback(
		async function () {
			const selectionIds = getSelectionIds(value);
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
		[value, onChange]
	);

	return <TextField placeholder="Search products" prefix={<Icon source={SearchIcon} />} onFocus={handleProductModalOpen} />;
}

VariantPicker.propTypes = {
	value: PropTypes.arrayOf(
		PropTypes.shape({
			productId: PropTypes.string,
			variantId: PropTypes.string
		})
	),
	onChange: PropTypes.func
};
