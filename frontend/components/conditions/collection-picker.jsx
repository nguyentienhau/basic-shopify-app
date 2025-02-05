import PropTypes from "prop-types";
import { useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TextField, Icon } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { CollectionIdPrefix } from "@/constants";

function getSelectionIds(data) {
	return data.map(function (collectionId) {
		return CollectionIdPrefix + collectionId;
	});
}

export function CollectionPicker({ value = [], onChange = () => {} }) {
	const shopify = useAppBridge();

	const handleCollectionModalOpen = useCallback(
		async function () {
			const filter = { hidden: true };
			const selectionIds = getSelectionIds(value);
			const collections = await shopify.resourcePicker({ type: "collection", filter, multiple: true, action: "select", selectionIds });

			if (collections) {
				const newValue = collections.map(function (collection) {
					return collection.replace(CollectionIdPrefix, "");
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
	onChange: PropTypes.func
};
