import PropTypes from "prop-types";
import { ChoiceList } from "@shopify/polaris";
import { CustomerPicker } from "./customer-picker";
import { TagPicker } from "./tag-picker";

export function CustomerCondition({ value = {}, onChange = () => {} }) {
	function handleAttributesChange(data) {
		onChange({ ...value, ...data });
	}

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
						return selected ? (
							<CustomerPicker
								value={value.customerIds}
								onChange={(value) => handleAttributesChange({ customerIds: value })}
							/>
						) : null;
					}
				},
				{
					label: "Customer tags",
					value: 3,
					renderChildren: function (selected) {
						return selected ? (
							<TagPicker
								type="customer"
								value={value.customerTags}
								onChange={(value) => handleAttributesChange({ customerTags: value })}
							/>
						) : null;
					}
				}
			]}
			selected={[value.customerOption]}
			onChange={(value) => handleAttributesChange({ customerOption: value[0] })}
		/>
	);
}

CustomerCondition.propTypes = {
	value: PropTypes.shape({
		customerOption: PropTypes.number,
		customerIds: PropTypes.arrayOf(PropTypes.string),
		customerTags: PropTypes.arrayOf(PropTypes.string)
	}),
	onChange: PropTypes.func
};
