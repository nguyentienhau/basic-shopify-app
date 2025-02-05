import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Button } from "@shopify/polaris";
import { AgPlans } from "@/constants";

export function UpgradePlanText({ planId = 0, dirty = false }) {
	const navigate = useNavigate();
	const shopify = useAppBridge();

	function handleUpgradePlanClick() {
		dirty ? shopify.saveBar.leaveConfirmation() : navigate("/plans");
	}

	return (
		<Button variant="plain" onClick={handleUpgradePlanClick}>
			Available on <b>{AgPlans[planId].name}</b>
		</Button>
	);
}

UpgradePlanText.propTypes = {
	planId: PropTypes.number,
	dirty: PropTypes.bool
};
