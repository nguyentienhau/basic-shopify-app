import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Banner, Text, Button } from "@shopify/polaris";
import { ModuleDataMap, PlanDataMap } from "@/constants";

export function EnableModuleBanner({ moduleId = 0, dirty = false }) {
	const navigate = useNavigate();
	const shopify = useAppBridge();
	// const { allowUse, status, planId } = useSelector((state) => state.moduleStates[moduleId]);
	const { allowUse, status, planId } = { allowUse: false, status: false, planId: 0 };

	const handleConfigurationClick = useCallback(
		function () {
			dirty ? shopify.saveBar.leaveConfirmation() : navigate("/configurations");
		},
		[dirty]
	);

	const handleUpgradePlanClick = useCallback(
		function () {
			dirty ? shopify.saveBar.leaveConfirmation() : navigate("/plans");
		},
		[dirty]
	);

	if (allowUse) {
		return status ? null : (
			<Banner tone="warning" title="Enable Feature">
				<Text as="span" variant="headingSm">
					{ModuleDataMap[moduleId].name}
				</Text>
				<Text as="span"> is disabled on your Online Store. To make it work, please </Text>
				<Button variant="plain" onClick={handleConfigurationClick}>
					Go to Configurations
				</Button>
				<Text as="span"> and enable this feature.</Text>
			</Banner>
		);
	} else {
		return (
			<Banner tone="warning" title="Upgrade Plan">
				<Text as="span" variant="headingSm">
					{ModuleDataMap[moduleId].name}
				</Text>
				<Text as="span"> is unavailable now. Please </Text>
				<Button variant="plain" onClick={handleUpgradePlanClick}>
					<Text as="span">Upgrade to </Text>
					<Text as="span" variant="headingSm">
						{PlanDataMap[planId].name}
					</Text>
				</Button>
				<Text as="span"> to use this feature.</Text>
			</Banner>
		);
	}
}

EnableModuleBanner.propTypes = {
	moduleId: PropTypes.number,
	dirty: PropTypes.bool
};
