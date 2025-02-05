import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FullscreenBar, InlineStack, Button, Text, Tooltip } from "@shopify/polaris";
import { AdjustIcon, ButtonIcon, FileIcon } from "@shopify/polaris-icons";
import { RuleGeneral, RuleButton, RuleForm, RulePreview } from "@/components/request-quote";
import styles from "@/styles/request-quote/rule-page.css";

export default function Rule() {
	const navigate = useNavigate();
	const [selectedTab, setSelectedTab] = useState(0);

	function handleBack() {
		navigate("/request-quote");
	}

	function handleTabSelect(value) {
		setSelectedTab(value);
	}

	const tabs = useMemo(function () {
		return [
			{
				icon: AdjustIcon,
				content: "General Settings",
				component: <RuleGeneral />
			},
			{
				icon: ButtonIcon,
				content: "Button Settings",
				component: <RuleButton />
			},
			{
				icon: FileIcon,
				content: "Form Settings",
				component: <RuleForm />
			}
		];
	}, []);

	return (
		<div className={styles.pageContainer}>
			<FullscreenBar onAction={handleBack}>
				<Text as="h3" variant="headingLg">
					Add Rule
				</Text>
			</FullscreenBar>
			<InlineStack>
				<div className={styles.buttonSection}>
					{tabs.map(function (tab, index) {
						return (
							<Tooltip content={tab.content} key={"tab" + index}>
								<Button
									fullWidth={true}
									icon={tab.icon}
									variant={selectedTab === index ? "plain" : "monochromePlain"}
									onClick={() => handleTabSelect(index)}
								/>
							</Tooltip>
						);
					})}
				</div>
				<div className={styles.settingSection}>{tabs[selectedTab].component}</div>
				<div className={styles.previewSection}>
					<RulePreview />
				</div>
			</InlineStack>
		</div>
	);
}
