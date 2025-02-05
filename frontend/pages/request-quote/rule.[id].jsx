import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page, Layout, Card, TextField, Select, BlockStack, Box, Text } from "@shopify/polaris";
import { useStateChange } from "@/hooks";
import { SaveBar } from "@/components/resource";
import { CustomerCondition, ProductCondition, EnableModuleBanner } from "@/components/common";
import { requestHelper } from "@/helpers";
import { ModuleDataMap, RequestQuoteRule } from "@/constants";

const moduleId = 0;
const backPath = "/request-quote?tab=1";
const rulePath = "/request-quote/rule";
const errorMapSample = { name: "" };
const ruleSample = RequestQuoteRule.copy();

export default function Rule() {
	const navigate = useNavigate();
	const shopify = useAppBridge();
	const { id } = useParams();
	const [rule, setRule] = useState(ruleSample);
	const [loading, setLoading] = useState(true);
	const [dirty, previousState, setPreviousState] = useStateChange(rule);
	const [errorMap, setErrorMap] = useState(errorMapSample.copy());

	const fetchData = useCallback(async function (id) {
		const response = await requestHelper.get(rulePath, [{ id }]);

		if (response.success && response.data.length === 1) {
			const rule = response.data[0];
			setRule(rule);
			setPreviousState(rule);
			setLoading(false);
		}
	}, []);

	const handleAttributeChange = useCallback(
		function (key, value) {
			const newRule = { ...rule, [key]: value };
			setRule(newRule);
			setErrorMap(errorMapSample);
		},
		[rule]
	);

	const handleConditionChange = useCallback(
		function (value) {
			const newRule = { ...rule, ...value };
			setRule(newRule);
			setErrorMap(errorMapSample);
		},
		[rule]
	);

	const handleBack = useCallback(
		function () {
			dirty ? shopify.saveBar.leaveConfirmation() : navigate(backPath);
		},
		[dirty]
	);

	const handleDiscard = useCallback(
		function () {
			setRule(previousState);
		},
		[previousState]
	);

	const handleSave = useCallback(
		async function () {
			const errorMap = errorMapSample.copy();

			if (rule.name.trim().length === 0) {
				errorMap.name = "Name can't be empty";
			}

			if (Object.entries(errorMap).every(([key, value]) => value.length === 0)) {
				const response = await requestHelper.post(rulePath, [rule]);

				if (response.success && response.data.length === 1 && id === "add") {
					navigate(rulePath + "/" + response.data[0].id);
				}

				shopify.toast.show(response.message, { duration: 2000 });
			}

			setErrorMap(errorMap);
		},
		[id, rule]
	);

	const handleDelete = useCallback(
		async function () {
			const response = await requestHelper.delete(rulePath, [{ id }]);

			if (response.success) {
				navigate(backPath);
			}

			shopify.toast.show(response.message, { duration: 2000 });
		},
		[id]
	);

	useEffect(
		function () {
			if (id === "add") {
				setLoading(false);
			} else {
				const ruleId = Number(id);
				id.length && ruleId ? fetchData(ruleId) : navigate(backPath);
			}
		},
		[id]
	);

	const customerConditionValue = useMemo(
		function () {
			const attributeNames = ["customerOption", "customerIds", "customerTags"];
			return attributeNames.reduce(function (accumulator, attributeName) {
				accumulator[attributeName] = rule[attributeName];
				return accumulator;
			}, {});
		},
		[rule]
	);

	const productConditionValue = useMemo(
		function () {
			const attributeNames = ["productOption", "productIds", "collectionIds", "productTags"];
			return attributeNames.reduce(function (accumulator, attributeName) {
				accumulator[attributeName] = rule[attributeName];
				return accumulator;
			}, {});
		},
		[rule]
	);

	return loading ? null : (
		<Page title={id === "add" ? "Add Rule" : "Edit Rule #" + id} backAction={{ onAction: handleBack }}>
			<SaveBar open={dirty} loading={loading} onSave={handleSave} onDiscard={handleDiscard} />
			<Box paddingBlockEnd="400">
				<EnableModuleBanner moduleId={moduleId} dirty={dirty} />
			</Box>
			<BlockStack gap="400">
				<Layout>
					<Layout.AnnotatedSection title="General setting">
						<Card>
							<BlockStack gap="300">
								<TextField label="Name" value={rule.name} onChange={(value) => handleAttributeChange("name", value)} error={errorMap.name} />
								<TextField
									type="number"
									label="Priority"
									value={rule.priority}
									onChange={(value) => handleAttributeChange("priority", Math.min(99, Number(value)))}
									helpText="Enter a number between 0 and 99. 0 is the highest priority."
									min={0}
									max={99}
								/>
								<Select
									label="Status"
									options={[
										{ label: "Enable", value: true },
										{ label: "Disable", value: false }
									]}
									value={rule.status}
									onChange={(value) => handleAttributeChange("status", value)}
								/>
							</BlockStack>
						</Card>
					</Layout.AnnotatedSection>
				</Layout>
				<Layout>
					<Layout.AnnotatedSection title="Customer condition">
						<Card>
							<CustomerCondition value={customerConditionValue} onChange={handleConditionChange} />
						</Card>
					</Layout.AnnotatedSection>
				</Layout>
				<Layout>
					<Layout.AnnotatedSection title="Product condition">
						<Card>
							<ProductCondition value={productConditionValue} onChange={handleConditionChange} />
						</Card>
					</Layout.AnnotatedSection>
				</Layout>
			</BlockStack>
			<Box paddingBlockEnd="400"></Box>
		</Page>
	);
}
