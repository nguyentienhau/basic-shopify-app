import PropTypes from "prop-types";

const defaultProps = { tabs: [], selected: 0, onSelect: (value) => console.log(value) };

export function VerticalTabs(props = defaultProps) {
	const { tabs, selected, onSelect } = { ...defaultProps, ...props };

	return "";
}

VerticalTabs.propTypes = {
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.any.isRequired,
			content: PropTypes.node.isRequired,
			icon: PropTypes.node
		})
	),
	selected: PropTypes.number,
	onSelect: PropTypes.func
};
