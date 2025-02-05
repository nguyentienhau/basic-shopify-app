import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Banner, Text, Button } from "@shopify/polaris";
import { ModuleDataMap, PlanDataMap } from "@/constants";

const defaultProps = { moduleId: 0, dirty: false };

export function EnableModuleBanner(props = defaultProps) {
	const navigate = useNavigate();
	const shopify = useAppBridge();
	const { moduleId, dirty } = { ...defaultProps, ...props };
	const { allowUse, status, planId } = useSelector((state) => state.moduleStates[moduleId]);

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
				<Text as="span">is disabled on your Online Store. To make it work, please Enable it on</Text>
				<Button variant="plain" onClick={handleConfigurationClick}>
					Configurations
				</Button>
			</Banner>
		);
	} else {
		return (
			<Banner tone="warning" title="Upgrade Plan">
				<Text as="span" variant="headingSm">
					{ModuleDataMap[moduleId].name}
				</Text>
				<Text as="span">is unavailable now. To use it, please Upgrade your plan to</Text>
				<Button variant="plain" onClick={handleUpgradePlanClick}>
					{PlanDataMap[planId].name}
				</Button>
			</Banner>
		);
	}
}

EnableModuleBanner.propTypes = {
	moduleId: PropTypes.number,
	dirty: PropTypes.bool
};
