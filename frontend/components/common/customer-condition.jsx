import PropTypes from "prop-types";
import { useCallback } from "react";
import { ChoiceList } from "@shopify/polaris";
import { CustomerPicker, TagPicker } from "@/components/resource";

const defaultProps = {
	value: { customerOption: 0, customerIds: [], customerTags: [] },
	onChange: (value) => console.log(value)
};

export function CustomerCondition(props = defaultProps) {
	const { value, onChange } = { ...defaultProps, ...props };

	const handleAttributeChange = useCallback(
		function (attributeName = "customerOption", attributeValue = 0) {
			const newValue = value.copy();
			newValue[attributeName] = attributeValue;
			onChange(newValue);
		},
		[value, onChange]
	);

	const handleCustomerIdRemove = useCallback(
		function (customerId) {
			const newValue = value.copy();
			newValue.customerIds = newValue.customerIds.filter((id) => id !== customerId);
			onChange(newValue);
		},
		[value, onChange]
	);

	const handleCustomerTagRemove = useCallback(
		function (customerTag) {
			const newCustomerTags = value.customerTags.filter((tag) => tag !== customerTag);
			const newValue = { ...value, customerTags: newCustomerTags };
			onChange(newValue);
		},
		[value, onChange]
	);

	return (
		<ChoiceList
			choices={[
				{
					label: "All customers",
					value: 0
				},
				{
					label: "Logged-in customers",
					value: 1
				},
				{
					label: "Specific customers",
					value: 2,
					renderChildren: function (selected) {
						const changeCustomerIds = (value) => handleAttributeChange("customerIds", value);
						return selected ? <CustomerPicker value={value.customerIds} onChange={changeCustomerIds} /> : null;
					}
				},
				{
					label: "Customer tags",
					value: 3,
					renderChildren: function (selected) {
						const changeCustomerTags = (value) => handleAttributeChange("customerTags", value);
						return selected ? <TagPicker type="customer" value={value.customerTags} onChange={changeCustomerTags} /> : null;
					}
				}
			]}
			selected={[value.customerOption]}
			onChange={(value) => handleAttributeChange("customerOption", value[0])}
		/>
	);
}

CustomerCondition.propTypes = {
	value: PropTypes.shape({
		customerOption: PropTypes.number,
		customerIds: PropTypes.array,
		customerTags: PropTypes.array,
		copy: PropTypes.func
	}),
	onChange: PropTypes.func
};
