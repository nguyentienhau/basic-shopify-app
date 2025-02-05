import PropTypes from "prop-types";
import "@/styles/resource/switch.css";

export function Switch({ enable = false, loading = false, onChange = () => {} }) {
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
