import PropTypes from "prop-types";
import { useState } from "react";
import { TextField, Icon } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";

const defaultProps = { value: [], onChange: (value) => console.log(value) };

export function CustomerPicker(props = defaultProps) {
	const { value, onChange } = { ...defaultProps, ...props };
	const [modalOpen, setModalOpen] = useState(false);

	console.log(modalOpen);

	return <TextField placeholder="Select customers" prefix={<Icon source={SearchIcon} />} onFocus={() => setModalOpen(true)} />;
}

CustomerPicker.propTypes = {
	value: PropTypes.array,
	onChange: PropTypes.func
};
