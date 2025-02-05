import PropTypes from "prop-types";
import { ChoiceList } from "@shopify/polaris";
import { VariantPicker } from "./variant-picker";
import { CollectionPicker } from "./collection-picker";
import { TagPicker } from "./tag-picker";

export function ProductCondition({ value = {}, onChange = () => {} }) {
	function handleAttributesChange(data) {
		onChange({ ...value, ...data });
	}

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
						return selected ? (
							<VariantPicker
								value={value.variantIds}
								onChange={(value) => handleAttributesChange({ variantIds: value })}
							/>
						) : null;
					}
				},
				{
					label: "Product collections",
					value: 2,
					renderChildren: function (selected) {
						return selected ? (
							<CollectionPicker
								value={value.collectionIds}
								onChange={(value) => handleAttributesChange({ collectionIds: value })}
							/>
						) : null;
					}
				},
				{
					label: "Product tags",
					value: 3,
					renderChildren: function (selected) {
						return selected ? (
							<TagPicker
								type="product"
								value={value.productTags}
								onChange={(value) => handleAttributesChange({ productTags: value })}
							/>
						) : null;
					}
				}
			]}
			selected={[value.productOption]}
			onChange={(value) => handleAttributesChange({ productOption: value[0] })}
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
