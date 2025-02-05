import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import { ChoiceList } from "@shopify/polaris";
import { ProductPicker, CollectionPicker, TagPicker } from "@/components/resource";
import { requestHelper } from "@/helpers";

const defaultProps = {
	value: { productOption: 0, productIds: [], collectionIds: [], productTags: [] },
	onChange: (value) => console.log(value)
};

export function ProductCondition(props = defaultProps) {
	const { value, onChange } = { ...defaultProps, ...props };
	const { selectedProducts, setSelectedProducts } = useState([]);
	const { selectedCollections, setSelectedCollections } = useState([]);

	const handleAttributeChange = useCallback(
		async function (attributeName, attributeValue) {
			const newValue = { ...value, [attributeName]: attributeValue };
			onChange(newValue);

			if (attributeName === "productIds") {
				const queryStrings = attributeValue.map((id) => "id:" + id);
				const response = await requestHelper.patch("/products", queryStrings);

				if (response.success && response.data.isArray()) {
					setSelectedProducts(response.data);
				}
			} else if (attributeName === "collectionIds") {
				const queryStrings = attributeValue.map((id) => "id:" + id);
				const response = await requestHelper.patch("/collections", queryStrings);

				if (response.success && response.data.isArray()) {
					setSelectedCollections(response.data);
				}
			}
		},
		[value, onChange]
	);

	const handleProductIdRemove = useCallback(
		function (productId) {
			const newProductIds = value.productIds.filter((id) => id !== productId);
			const newProducts = selectedProducts.filter((product) => product.id !== productId);
			const newValue = { ...value, productIds: newProductIds };
			setSelectedProducts(newProducts);
			onChange(newValue);
		},
		[value, onChange, selectedProducts]
	);

	const handleCollectionIdRemove = useCallback(
		function (collectionId) {
			const newCollectionIds = value.collectionIds.filter((id) => id !== collectionId);
			const newCollections = selectedCollections.filter((collection) => collection.id !== collectionId);
			const newValue = { ...value, collectionIds: newCollectionIds };
			setSelectedCollections(newCollections);
			onChange(newValue);
		},
		[value, onChange, selectedCollections]
	);

	const handleProductTagRemove = useCallback(
		function (productTag) {
			const newProductTags = value.productTags.filter((tag) => tag !== productTag);
			const newValue = { ...value, productTags: newProductTags };
			onChange(newValue);
		},
		[value, onChange]
	);

	return (
		<ChoiceList
			choices={[
				{
					label: "All products",
					value: 0
				},
				{
					label: "Specific products",
					value: 1,
					renderChildren: function (selected) {
						const changeProductIds = (value) => handleAttributeChange("productIds", value);
						return selected ? <ProductPicker value={value.productIds} onChange={changeProductIds} /> : null;
					}
				},
				{
					label: "Product collections",
					value: 2,
					renderChildren: function (selected) {
						const changeCollectionIds = (value) => handleAttributeChange("collectionIds", value);
						return selected ? <CollectionPicker value={value.collectionIds} onChange={changeCollectionIds} /> : null;
					}
				},
				{
					label: "Product tags",
					value: 3,
					renderChildren: function (selected) {
						const changeProductTags = (value) => handleAttributeChange("productTags", value);
						return selected ? <TagPicker type="product" value={value.productTags} onChange={changeProductTags} /> : null;
					}
				}
			]}
			selected={[value.productOption]}
			onChange={(value) => handleAttributeChange("productOption", value[0])}
		/>
	);
}

ProductCondition.propTypes = {
	value: PropTypes.shape({
		productOption: PropTypes.number,
		productIds: PropTypes.array,
		collectionIds: PropTypes.array,
		productTags: PropTypes.array,
		copy: PropTypes.func
	}),
	onChange: PropTypes.func
};
