import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Button } from "@shopify/polaris";
import { PlanDataMap } from "@/constants";

export function UpgradePlanText({ planId = 0, dirty = false }) {
	const navigate = useNavigate();
	const shopify = useAppBridge();

	const handleUpgradePlanClick = useCallback(
		function () {
			dirty ? shopify.saveBar.leaveConfirmation() : navigate("/plans");
		},
		[dirty]
	);

	return (
		<Button variant="plain" onClick={handleUpgradePlanClick}>
			Available on <b>{PlanDataMap[planId].name}</b>
		</Button>
	);
}

UpgradePlanText.propTypes = {
	planId: PropTypes.number,
	dirty: PropTypes.bool
};
