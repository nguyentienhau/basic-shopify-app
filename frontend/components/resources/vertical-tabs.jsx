import PropTypes from "prop-types";

export function VerticalTabs({ tabs = [], selected = 0, onSelect = () => {} }) {
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
