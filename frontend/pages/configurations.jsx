import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page, Grid, Card, InlineStack, Box, Button, Text, Icon } from "@shopify/polaris";
import { CalendarTimeIcon, OrderIcon, ProfileIcon, SearchListIcon, WorkIcon } from "@shopify/polaris-icons";
import { useStateChange } from "@/hooks";
import { SaveBar, Switch } from "@/components/resource";
import { requestHelper } from "@/helpers";
import { ModuleDataMap, PlanDataMap } from "@/constants";

const gridColumnSpan = { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 };
const moduleIds = Array.from(Object.keys(ModuleDataMap));
const moduleIconMap = { 0: SearchListIcon, 1: CalendarTimeIcon, 2: OrderIcon, 3: WorkIcon, 4: ProfileIcon };
const moduleDescriptionMap = {
	0: "Allow customers to place quotes on your products",
	1: "Allow customers to make net payment term orders",
	2: "Create product catalogs for easy bulk ordering",
	3: "Allow customers to register and manage their companies",
	4: "Sales reps help take care of customers right from your store"
};

export default function Configurations() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const shopify = useAppBridge();
	const { t } = useTranslation();
	// const user = useSelector((state) => state.user);
	// const moduleStateMap = useSelector((state) => state.moduleStateMap);
	const [loading, setLoading] = useState(false);
	const [currentModuleStateMap, setCurrentModuleStateMap] = useState({});
	const [dirty, previousState, setPreviousState] = useStateChange(currentModuleStateMap);

	const handleModuleStatusChange = useCallback(
		function (moduleId, status) {
			const newStateMap = currentModuleStateMap.copy();
			newStateMap[moduleId].status = status;
			setCurrentModuleStateMap(newStateMap);
			shopify.toast.show(t(status ? "Module enabled" : "Module disabled"), { duration: 1000 });
		},
		[currentModuleStateMap]
	);

	const handleConfigureModuleClick = useCallback(
		function (moduleId) {
			console.log(moduleId);
			const moduleCode = ModuleDataMap[moduleId].code;
			dirty ? shopify.saveBar.leaveConfirmation() : navigate("/" + moduleCode);
		},
		[dirty]
	);

	const handleUpgradePlanClick = useCallback(
		function () {
			dirty ? shopify.saveBar.leaveConfirmation() : navigate("/plans");
		},
		[dirty]
	);

	const handleSaveBarDiscard = useCallback(
		function () {
			setCurrentModuleStateMap(previousState);
		},
		[previousState]
	);

	// const handleSaveBarSave = useCallback(async function () {
	// 	setLoading(true);

	// 	const userModules = Object.entries(currentModuleStateMap).map(function (entry) {
	// 		const [moduleId, moduleState] = entry;
	// 		return { userId: user.id, moduleId, status: moduleState.status };
	// 	});
	// 	const [updateResponse, uploadContent] = await Promise.all([
	// 		requestHelper.update("/user-module", userModules),
	// 		requestHelper.update("/upload-content", { userId: user.id })
	// 	]);

	// 	if (updateResponse.success && uploadResponse.success) {
	// 		dispatch("UPDATE_MODULE_STATE_MAP", currentModuleStateMap);
	// 		shopify.toast.show(t("Modules updated"), { duration: 2000 });
	// 	} else {
	// 		shopify.toast.show(t("Update modules failed"), { duration: 2000 });
	// 	}

	// 	setLoading(false);
	// }, [user.id, currentModuleStateMap]);

	// useEffect(function () {
	// 	setCurrentModuleStateMap(moduleStateMap);
	// 	setPreviousState(moduleStateMap);
	// }, [moduleStateMap]);

	return (
		<Page title="Configurations">
			<SaveBar open={dirty} loading={loading} onSave={() => {}} onDiscard={handleSaveBarDiscard} />
			<Grid>
				{moduleIds.map(function (moduleId) {
					const { allowUse, status, planId } = currentModuleStateMap[moduleId] || { allowUse: true, status: false, planId: 0 };
					const clickConfigureModule = () => handleConfigureModuleClick(moduleId);
					const changeModuleStatus = (value) => handleModuleStatusChange(moduleId, value);

					return (
						<Grid.Cell columnSpan={gridColumnSpan} key={moduleId}>
							<Card>
								<InlineStack align="space-between" blockAlign="center">
									<InlineStack gap="100" blockAlign="center">
										<Icon source={moduleIconMap[moduleId]} tone="base" />
										<Text as="h3" variant="headingMd">
											{ModuleDataMap[moduleId].name}
										</Text>
									</InlineStack>
									{allowUse ? (
										<Switch enable={status} loading={loading} onChange={changeModuleStatus} />
									) : (
										<Button variant="plain" onClick={handleUpgradePlanClick}>
											<Text as="span">Available on</Text>
											<Text as="span" variant="headingSm">
												{PlanDataMap[planId].name}
											</Text>
										</Button>
									)}
								</InlineStack>
								<Box padding="200" minHeight="56px">
									{moduleDescriptionMap[moduleId]}
								</Box>
								<Box paddingInline="200">
									<Button onClick={clickConfigureModule} size="large">
										Configure
									</Button>
								</Box>
							</Card>
						</Grid.Cell>
					);
				})}
			</Grid>
		</Page>
	);
}
