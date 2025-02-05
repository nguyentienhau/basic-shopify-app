import { useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page, Box, Card, Tabs, InlineStack, Icon, Text } from "@shopify/polaris";
import { OrderIcon, ListBulletedIcon, SettingsIcon, FileIcon } from "@shopify/polaris-icons";
import { EnableModuleBanner, SetupModuleBanner } from "@/components/common";
import { OrderTable, RuleTable, SettingList, TemplateTable } from "@/components/request-quote";
import { ModuleDataMap } from "@/constants";

const moduleId = 0;

function getTabIndex(searchParams) {
	const tabIndex = Number(searchParams.get("tab")) || 0;
	return tabIndex >= 0 && tabIndex <= 2 ? tabIndex : 0;
}

export default function Index() {
	const navigate = useNavigate();
	const shopify = useAppBridge();
	const [searchParams] = useSearchParams();
	const [selectedTab, setSelectedTab] = useState(getTabIndex(searchParams));
	const [dirty, setDirty] = useState(false);

	const handleBack = useCallback(
		function () {
			const path = "/configurations";
			dirty ? shopify.saveBar.leaveConfirmation() : navigate(path);
		},
		[dirty]
	);

	const handleQuoteAdd = useCallback(
		function () {
			const path = "/" + ModuleDataMap[moduleId].code + "/quote/add";
			dirty ? shopify.saveBar.leaveConfirmation() : navigate(path);
		},
		[dirty]
	);

	const handleRuleAdd = useCallback(
		function () {
			const path = "/" + ModuleDataMap[moduleId].code + "/rule/add";
			dirty ? shopify.saveBar.leaveConfirmation() : navigate(path);
		},
		[dirty]
	);

	const handleTabSelect = useCallback(
		function (value) {
			dirty ? shopify.saveBar.leaveConfirmation() : setSelectedTab(value);
		},
		[dirty]
	);

	const tabs = useMemo(function () {
		return [
			{ id: "quotes", content: "Quotes", icon: OrderIcon, component: <OrderTable /> },
			{ id: "rules", content: "Rules", icon: ListBulletedIcon, component: <RuleTable /> },
			{ id: "settings", content: "Settings", icon: SettingsIcon, component: <SettingList setDataDirty={setDirty} /> },
			{ id: "templates", content: "Templates", icon: FileIcon, component: <TemplateTable /> }
		];
	}, []);

	return (
		<Page
			title={ModuleDataMap[moduleId].name}
			backAction={{ onAction: handleBack }}
			primaryAction={{ content: "Add quote", onAction: handleQuoteAdd }}
			secondaryActions={[{ content: "Add rule", onAction: handleRuleAdd }]}
		>
			{/*<Box paddingBlockEnd="400">
				<EnableModuleBanner moduleId={moduleId} dirty={dirty} />
				<SetupModuleBanner moduleId={moduleId} dirty={dirty} />
			</Box>*/}
			<Tabs
				tabs={tabs.map(function (tab, index) {
					return {
						id: tab.id,
						content: (
							<InlineStack align="center" blockAlign="center" gap="100" wrap={false}>
								<Icon source={tab.icon} tone="base" />
								<Text as="span" variant={selectedTab === index ? "headingSm" : "bodyMd"}>
									{tab.content}
								</Text>
							</InlineStack>
						)
					};
				})}
				selected={selectedTab}
				onSelect={handleTabSelect}
				fitted={true}
			>
				{tabs[selectedTab].component}
			</Tabs>
		</Page>
	);
}
