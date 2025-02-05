import PropTypes from "prop-types";
import { useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TextField, Icon } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";

const defaultProps = { value: [], onChange: (value) => console.log(value) };
const filter = { hidden: true, variants: false };
const configuration = { type: "product", filter, multiple: true, action: "select" };
const productIdPrefix = "gid://shopify/Product/";

function getSelectionIds(data) {
	return data.map(function (productId) {
		return { id: productIdPrefix + productId };
	});
}

export function ProductPicker(props = defaultProps) {
	const shopify = useAppBridge();
	const { value, onChange } = { ...defaultProps, ...props };

	const handleProductModalOpen = useCallback(
		async function () {
			const selectionIds = getSelectionIds(value);
			const products = await shopify.resourcePicker({ ...configuration, selectionIds });

			if (products) {
				const newValue = products.map(function (product) {
					return product.id.replace(productIdPrefix, "");
				});
				onChange(newValue);
			}
		},
		[value, onChange]
	);

	return <TextField placeholder="Search products" prefix={<Icon source={SearchIcon} />} onFocus={handleProductModalOpen} />;
}

ProductPicker.propTypes = {
	value: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func
};
