import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import { ChoiceList } from "@shopify/polaris";
import { VariantPicker, CollectionPicker, TagPicker } from "@/components/picker";
import { requestHelper } from "@/helpers";

const defaultProps = {
	value: { productOption: 0, variantIds: [], collectionIds: [], productTags: [] },
	onChange: (value) => console.log(value)
};

export function ProductCondition(props = defaultProps) {
	const { value, onChange } = { ...defaultProps, ...props };
	const { selectedProducts, setSelectedProducts } = useState([]);
	const { selectedCollections, setSelectedCollections } = useState([]);

	const handleAttributeChange = useCallback(
		function (attributeName, attributeValue) {
			onChange({ ...value, [attributeName]: attributeValue });
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
						const changeVariantIds = (value) => handleAttributeChange("variantIds", value);
						return selected ? <VariantPicker value={value.variantIds} onChange={changeVariantIds} /> : null;
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
		variantIds: PropTypes.arrayOf(PropTypes.string),
		collectionIds: PropTypes.arrayOf(PropTypes.string),
		productTags: PropTypes.arrayOf(PropTypes.string)
	}),
	onChange: PropTypes.func
};
