import PropTypes from "prop-types";

export function CustomerPicker({ value = [], onChange = () => {} }) {
	onChange(value);
	return "";
}

CustomerPicker.propTypes = {
	value: PropTypes.array,
	onChange: PropTypes.func
};
