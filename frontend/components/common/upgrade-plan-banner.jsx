import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Banner, Text, Button } from "@shopify/polaris";
import { AgPlans } from "@/constants";

export function UpgradePlanBanner({ planId = 0, dirty = false }) {
	const navigate = useNavigate();
	const shopify = useAppBridge();

	function handleUpgradePlanClick() {
		dirty ? shopify.saveBar.leaveConfirmation() : navigate("/plans");
	}

	return (
		<Banner tone="warning" title="Upgrade Plan">
			<Text as="span">This feature is unavailable now. Please </Text>
			<Button variant="plain" onClick={handleUpgradePlanClick}>
				Upgrade to <b>{AgPlans[planId].name}</b>
			</Button>
			<Text as="span"> to use this feature</Text>
		</Banner>
	);
}

UpgradePlanBanner.propTypes = {
	planId: PropTypes.number,
	dirty: PropTypes.bool
};
