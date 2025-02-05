import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TextField, Icon, BlockStack, InlineStack, Text, Avatar, Button } from "@shopify/polaris";
import { SearchIcon, XIcon } from "@shopify/polaris-icons";
import { AgHelper } from "@/helpers";
import { ProductIdPrefix, VariantIdPrefix } from "@/constants";

function getSelectionIds(data) {
	const variantIdsMap = {};

	data.forEach(function (item) {
		const productId = ProductIdPrefix + item.productId;
		const variantId = VariantIdPrefix + item.id;
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
	const [loading, setLoading] = useState(true);
	const [selectedVariants, setSelectedVariants] = useState([]);

	async function fetchData() {
		const condition = { ids: value };
		const response = await AgHelper.request("/shopify/variant", { condition });

		if (response.success) {
			setSelectedVariants(response.data);
			setLoading(false);
		}
	}

	async function handleSearchFocus() {
		const filter = { hidden: true, variants: true };
		const selectionIds = getSelectionIds(selectedVariants);
		const configurations = { type: "product", multiple: true, action: "select", filter, selectionIds };
		const products = await shopify.resourcePicker(configurations);

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
	}

	function handleIdRemove(id) {
		onChange(value.filter((item) => item !== id));
		setSelectedVariants(selectedVariants.filter((item) => item.id !== id));
	}

	useEffect(function () {
		fetchData();
	}, []);

	return (
		<BlockStack gap="200">
			<TextField
				placeholder="Search products"
				prefix={<Icon source={SearchIcon} />}
				loading={loading}
				onFocus={handleSearchFocus}
			/>
			{selectedVariants.map(function (item) {
				return (
					<InlineStack align="space-between" key={item.id}>
						<Avatar source={item.imageUrl} />
						<Text variant="bodyMd">{item.title}</Text>
						<Button icon={XIcon} variant="monochromePlain" onClick={() => handleIdRemove(item.id)} />
					</InlineStack>
				);
			})}
		</BlockStack>
	);
}

VariantPicker.propTypes = {
	value: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func
};
