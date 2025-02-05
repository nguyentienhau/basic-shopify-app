import PropTypes from "prop-types";
import "@/styles/resource/switch.css";

const defaultProps = { enable: false, loading: false, onChange: () => {} };

export function Switch(props = defaultProps) {
	const { enable, loading, onChange } = { ...defaultProps, ...props };

	return (
		<label className={loading ? "switch disable" : "switch"}>
			<input type="checkbox" checked={enable} onChange={onChange} />
			<span className="slider round"></span>
		</label>
	);
}

Switch.propTypes = {
	enable: PropTypes.bool,
	loading: PropTypes.bool,
	onChange: PropTypes.func
};
