import PropTypes from "prop-types";
import { useCallback } from "react";
import { ChoiceList } from "@shopify/polaris";
import { CustomerPicker, TagPicker } from "@/components/picker";

const defaultProps = {
	value: { customerOption: 0, customerEmails: [], customerTags: [] },
	onChange: (value) => console.log(value)
};

export function CustomerCondition(props = defaultProps) {
	const { value, onChange } = { ...defaultProps, ...props };

	const handleAttributeChange = useCallback(
		function (attributeName = "customerOption", attributeValue = 0) {
			onChange({ ...value, [attributeName]: attributeValue });
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
						const changeCustomerEmails = (value) => handleAttributeChange("customerEmails", value);
						return selected ? <CustomerPicker value={value.customerEmails} onChange={changeCustomerEmails} /> : null;
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
		customerEmails: PropTypes.arrayOf(PropTypes.string),
		customerTags: PropTypes.arrayOf(PropTypes.string),
		copy: PropTypes.func
	}),
	onChange: PropTypes.func
};
