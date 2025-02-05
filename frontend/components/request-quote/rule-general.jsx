import { useSelector, useDispatch } from "react-redux";
import { BlockStack, TextField, Select, Text, Checkbox } from "@shopify/polaris";
import { CustomerCondition, ProductCondition } from "@/components/condition";

export function RuleGeneral() {
	const dispatch = useDispatch();
	const rule = useSelector((state) => state.requestQuote.rule);

	function handleChangeRuleAttributes(data) {
		dispatch("CHANGE_RULE_ATTRIBUTES", data);
	}

	function handleChangeGeneralSettings(data) {
		dispatch("CHANGE_GENERAL_SETTINGS", data);
	}

	return (
		<BlockStack gap="300">
			<BlockStack gap="200">
				<Text variant="headingMd">General settings</Text>
				<TextField
					label="Name"
					value={rule.generalSettings.name}
					onChange={(value) => handleChangeGeneralSettings({ name: value })}
				/>
				<Select
					label="Status"
					options={[
						{ label: "Enable", value: true },
						{ label: "Disable", value: false }
					]}
					value={rule.generalSettings.status}
					onChange={(value) => handleChangeGeneralSettings({ status: value })}
				/>
				<Checkbox
					label="Hide price"
					checked={rule.generalSettings.hidePrice}
					onChange={(value) => handleChangeGeneralSettings({ hidePrice: value })}
				/>
			</BlockStack>
			<BlockStack gap="200">
				<Text variant="headingMd">Customer conditions</Text>
				<CustomerCondition
					value={{
						customerOption: rule.customerOption,
						customerIds: rule.customerIds,
						customerTags: rule.customerTags
					}}
					onChange={handleChangeRuleAttributes}
				/>
			</BlockStack>
			<BlockStack gap="200">
				<Text variant="headingMd">Product conditions</Text>
				<ProductCondition
					value={{
						productOption: rule.productOption,
						variantIds: rule.variantIds,
						collectionIds: rule.collectionIds,
						productTags: rule.productTags
					}}
					onChange={handleChangeRuleAttributes}
				/>
			</BlockStack>
		</BlockStack>
	);
}
