import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Banner, List, Box, Button, Text } from "@shopify/polaris";
import { ModuleDataMap } from "@/constants";

export function SetupModuleBanner({ moduleId = 0, dirty = false }) {
	const navigate = useNavigate();
	const shopify = useAppBridge();
	// const shop = useSelector((state) => state.shop);
	const shop = { domain: "" };

	const handleBannerDismiss = useCallback(
		function () {
			const bannerKey = ModuleDataMap[moduleId].code + "-setup";
			sessionStorage.setItem(bannerKey, false);
		},
		[moduleId]
	);

	const handleConfigurationClick = useCallback(
		function () {
			dirty ? shopify.saveBar.leaveConfirmation() : navigate("/configurations");
		},
		[moduleId, dirty]
	);

	const handleInstallationClick = useCallback(
		function () {
			dirty ? shopify.saveBar.leaveConfirmation() : navigate("/installations");
		},
		[moduleId, dirty]
	);

	const bannerShow = useMemo(
		function () {
			const bannerKey = ModuleDataMap[moduleId].code + "-setup";
			const show = sessionStorage.getItem(bannerKey) || "true";
			return show === "true";
		},
		[moduleId]
	);

	return bannerShow ? (
		<Banner title="Setup Feature Instructions" tone="info" onDismiss={handleBannerDismiss}>
			<List type="number">
				<List.Item>
					<Text as="span">{"Enable " + ModuleDataMap[moduleId].name + " on "}</Text>
					<Button onClick={handleConfigurationClick} variant="plain">
						Configurations
					</Button>
				</List.Item>
				<List.Item>{"Create " + ModuleDataMap[moduleId].name + " rule"}</List.Item>
				<List.Item>
					<Button onClick={handleInstallationClick} variant="plain">
						Install
					</Button>
					<Text as="span"> {ModuleDataMap[moduleId].name + " button to your theme"}</Text>
				</List.Item>
				<List.Item>
					<Text as="span">Check on </Text>
					<Button
						url={"https://" + shop.domain + "/apps/customer-portal/" + ModuleDataMap[moduleId].code}
						external={true}
						variant="plain"
					>{`${ModuleDataMap[moduleId].name} Proxy Page`}</Button>
				</List.Item>
			</List>
			<Box paddingInline="300">
				<Text as="span">Please refer to the </Text>
				<Button url={WIKI_LINK + "/" + ModuleDataMap[moduleId].code} external={true} variant="plain">
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
