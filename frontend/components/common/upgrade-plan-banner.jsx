import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Banner, Text, Button } from "@shopify/polaris";
import { PlanDataMap } from "@/constants";

const defaultProps = { planId: 0, dirty: false };

export function UpgradePlanBanner(props = defaultProps) {
	const navigate = useNavigate();
	const shopify = useAppBridge();
	const { planId, dirty } = { ...defaultProps, ...props };

	const handleUpgradePlanClick = useCallback(
		function () {
			dirty ? shopify.saveBar.leaveConfirmation() : navigate("/plans");
		},
		[dirty]
	);

	return (
		<Banner tone="warning" title="Upgrade Plan">
			<Text as="span">This feature is unavailable now. To use it, please Upgrade your plan to</Text>
			<Button variant="plain" onClick={handleUpgradePlanClick}>
				{PlanDataMap[planId].name}
			</Button>
		</Banner>
	);
}

UpgradePlanBanner.propTypes = {
	planId: PropTypes.number,
	dirty: PropTypes.bool
};
