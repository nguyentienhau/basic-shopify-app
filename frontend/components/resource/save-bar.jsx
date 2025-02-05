import PropTypes from "prop-types";
import { SaveBar as ShopifySaveBar } from "@shopify/app-bridge-react";

const defaultProps = { open: false, loading: false, onSave: () => {}, onDiscard: () => {} };

export function SaveBar(props = defaultProps) {
	const { open, loading, onSave, onDiscard } = { ...defaultProps, ...props };

	return (
		<ShopifySaveBar id="save-bar" open={open}>
			{/* eslint-disable-next-line react/no-unknown-property */}
			<button variant="primary" loading={loading ? "" : undefined} onClick={onSave}></button>
			<button onClick={onDiscard}></button>
		</ShopifySaveBar>
	);
}

SaveBar.propTypes = {
	open: PropTypes.bool,
	loading: PropTypes.bool,
	onSave: PropTypes.func,
	onDiscard: PropTypes.func
};
