import PropTypes from "prop-types";
import { useMemo } from "react";
import { Modal as ShopifyModal, TitleBar } from "@shopify/app-bridge-react";

const defaultProps = {
	open: false,
	title: "",
	onClose: () => {},
	primaryAction: { content: "", onAction: () => {}, disabled: false, loading: false },
	secondaryAction: { content: "", onAction: () => {}, disabled: false, loading: false },
	children: ""
};

export function Modal(props = defaultProps) {
	const { open, title, onClose, children } = { ...defaultProps, ...props };
	const primaryAction = props.primaryAction ? { ...defaultProps.primaryAction, ...props.primaryAction } : defaultProps.primaryAction;
	const secondaryAction = props.secondaryAction ? { ...defaultProps.secondaryAction, ...props.secondaryAction } : defaultProps.secondaryAction;

	const primaryButton = useMemo(
		function () {
			const { content, disabled, loading, onAction } = primaryAction;
			return (
				// eslint-disable-next-line react/no-unknown-property
				<button variant="primary" disabled={disabled} loading={loading ? "" : undefined} onClick={onAction}>
					{content}
				</button>
			);
		},
		[primaryAction]
	);

	const secondaryButton = useMemo(
		function () {
			const { content, disabled, loading, onAction } = secondaryAction;
			return (
				<button disabled={disabled} loading={loading ? "" : undefined} onClick={onAction}>
					{content}
				</button>
			);
		},
		[secondaryAction]
	);

	return (
		<ShopifyModal id="modal" open={open} onHide={onClose}>
			<TitleBar title={title}>
				{primaryAction.content ? primaryButton : null}
				{secondaryAction.content ? secondaryButton : null}
			</TitleBar>
			{children}
		</ShopifyModal>
	);
}

Modal.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string,
	onClose: PropTypes.func,
	primaryAction: PropTypes.shape({
		content: PropTypes.string,
		disabled: PropTypes.bool,
		loading: PropTypes.bool,
		onAction: PropTypes.func
	}),
	secondaryAction: PropTypes.shape({
		content: PropTypes.string,
		disabled: PropTypes.bool,
		loading: PropTypes.bool,
		onAction: PropTypes.func
	}),
	children: PropTypes.node
};
