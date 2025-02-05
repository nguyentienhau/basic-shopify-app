import PropTypes from "prop-types";
import { useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TextField, Icon } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";

const defaultProps = { value: [], onChange: (value) => console.log(value), setData: (data) => console.log(data) };
const filter = { hidden: true };
const configuration = { type: "collection", filter, multiple: true, action: "select" };
const collectionIdPrefix = "gid://shopify/Collection/";

function getSelectionIds(data) {
	return data.map(function (collectionId) {
		return collectionIdPrefix + collectionId;
	});
}

export function CollectionPicker(props = defaultProps) {
	const shopify = useAppBridge();
	const { value, onChange } = { ...defaultProps, ...props };

	const handleCollectionModalOpen = useCallback(
		async function () {
			const selectionIds = getSelectionIds(value);
			const collections = await shopify.resourcePicker({ ...configuration, selectionIds });

			if (collections) {
				const newValue = collections.map(function (collection) {
					return collection.replace(collectionIdPrefix, "");
				});
				onChange(newValue);
			}
		},
		[value, onChange]
	);

	return <TextField placeholder="Search collections" prefix={<Icon source={SearchIcon} />} onFocus={handleCollectionModalOpen} />;
}

CollectionPicker.propTypes = {
	value: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	setData: PropTypes.func
};
