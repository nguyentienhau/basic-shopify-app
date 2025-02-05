import PropTypes from "prop-types";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Banner, List, Box, Button, Text } from "@shopify/polaris";
import { AgModules } from "@/constants";

export function SetupModuleBanner({ moduleId = 0, dirty = false }) {
	const navigate = useNavigate();
	const shopify = useAppBridge();

	function handleBannerDismiss() {
		const bannerKey = AgModules[moduleId].code + "-setup";
		sessionStorage.setItem(bannerKey, false);
	}

	function handleInstallButtonClick() {
		dirty ? shopify.saveBar.leaveConfirmation() : navigate("/installations");
	}

	const bannerShow = useMemo(
		function () {
			const bannerKey = AgModules[moduleId].code + "-setup";
			const show = sessionStorage.getItem(bannerKey) || "true";
			return show === "true";
		},
		[moduleId]
	);

	return bannerShow ? (
		<Banner title="Setup Feature Instructions" tone="info" onDismiss={handleBannerDismiss}>
			<List type="number">
				<List.Item>{"Create " + AgModules[moduleId].name + " rule"}</List.Item>
				<List.Item>
					<Button onClick={handleInstallButtonClick} variant="plain">
						Install <b>{AgModules[moduleId].name}</b> button
					</Button>
					<Text as="span"> to your theme</Text>
				</List.Item>
				<List.Item>
					<Text as="span">Check feature on Onine Store</Text>
				</List.Item>
			</List>
			<Box paddingInline="300">
				<Text as="span">Please refer to the </Text>
				<Button url={WIKI_LINK + "/" + AgModules[moduleId].code} external={true} variant="plain">
					User Guide
				</Button>
				<Text as="span"> on how to use our feature</Text>
			</Box>
		</Banner>
	) : null;
}

SetupModuleBanner.propTypes = {
	moduleId: PropTypes.number,
	dirty: PropTypes.bool
};
