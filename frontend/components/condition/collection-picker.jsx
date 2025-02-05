import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { BlockStack, InlineStack, Text, Button, Avatar, TextField, Icon } from "@shopify/polaris";
import { SearchIcon, XIcon } from "@shopify/polaris-icons";
import { AgHelpers } from "@/helpers";
import { CollectionIdPrefix } from "@/constants";

function getSelectionIds(data) {
	return data.map((item) => CollectionIdPrefix + item.id);
}

export function CollectionPicker({ value = [], onChange = () => {} }) {
	const shopify = useAppBridge();
	const [loading, setLoading] = useState(true);
	const [selectedCollections, setSelectedCollections] = useState([]);

	async function fetchData() {
		const condition = { ids: value };
		const response = await AgHelpers.request("/shopify/collection", { type: "read", condition });

		if (response.success) {
			setSelectedCollections(response.data);
			setLoading(false);
		}
	}

	async function handleSearchFocus() {
		const filter = { hidden: true };
		const selectionIds = getSelectionIds(selectedCollections);
		const configurations = { type: "collection", multiple: true, action: "select", filter, selectionIds };
		const collections = await shopify.resourcePicker(configurations);

		if (collections) {
			const newValue = collections.map((id) => id.replace(CollectionIdPrefix, ""));
			onChange(newValue);
		}
	}

	function handleIdRemove(id) {
		onChange(value.filter((item) => item !== id));
		setSelectedCollections(selectedCollections.filter((item) => item.id !== id));
	}

	useEffect(function () {
		fetchData();
	}, []);

	return (
		<BlockStack gap="200">
			<TextField
				placeholder="Search collections"
				prefix={<Icon source={SearchIcon} />}
				loading={loading}
				onFocus={handleSearchFocus}
			/>
			{selectedCollections.map(function (item) {
				return (
					<InlineStack align="space-between" key={item.id}>
						<Avatar source={item.imageUrl} />
						<Text variant="bodyMd">{item.title}</Text>
						<Button icon={XIcon} variant="monochromePlain" onClick={() => handleIdRemove(item.id)} />
					</InlineStack>
				);
			})}
		</BlockStack>
	);
}

CollectionPicker.propTypes = {
	value: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func
};
