import PropTypes from "prop-types";
import { AppProvider } from "@shopify/polaris";
import { getPolarisTranslations } from "./i18n";
import "@shopify/polaris/build/esm/styles.css";

function BridgeLink({ url = "", children, external = false, ...rest }) {
	const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

	if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
		return (
			<a {...rest} href={url} target="_blank" rel="noopener noreferrer">
				{children}
			</a>
		);
	} else {
		return (
			<a {...rest} href={url} target="_self">
				{children}
			</a>
		);
	}
}

BridgeLink.propTypes = {
	url: PropTypes.string,
	children: PropTypes.node,
	external: PropTypes.bool
};

export function PolarisProvider({ children }) {
	const translations = getPolarisTranslations();

	return (
		<AppProvider i18n={translations} linkComponent={BridgeLink}>
			{children}
		</AppProvider>
	);
}

PolarisProvider.propTypes = {
	children: PropTypes.node
};
