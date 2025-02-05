import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import { BlockStack, InlineStack, Tag, Text, Icon, Autocomplete } from "@shopify/polaris";
import { SearchIcon, PlusCircleIcon } from "@shopify/polaris-icons";
import { AgHelpers } from "@/helpers";

export function TagPicker({ type = "product", value = [], onChange = () => {} }) {
	const [tags, setTags] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchText, setSearchText] = useState("");

	async function fetchData() {
		const response = await AgHelpers.request("/shopify/tag", { type: "read", data: { type } });

		if (response.success) {
			const resultSet = new Set(response.data.concat(value));
			setTags(Array.from(resultSet));
		} else {
			setTags(value);
		}

		setLoading(false);
	}

	function handleTagAdd(tag) {
		onChange(value.concat(tag));
		setTags(tags.concat(tag));
		setSearchText("");
	}

	function handleTagRemove(tag) {
		const newValue = value.filter((item) => item !== tag);
		onChange(newValue);
	}

	useEffect(function () {
		fetchData();
	}, []);

	const options = useMemo(
		function () {
			const tagText = searchText.trim().toLowerCase();
			const searchTags = tags.filter((tag) => tag.toLowerCase().includes(tagText));
			return searchTags.map((tag) => ({ label: tag, value: tag }));
		},
		[searchText, tags]
	);

	return (
		<BlockStack gap="200">
			<Autocomplete
				actionBefore={{
					content: (
						<Text as="span" variant="headingSm">
							Add
						</Text>
					),
					helpText: searchText,
					icon: PlusCircleIcon,
					badge: { tone: "new", content: "New!" },
					disabled: searchText.trim() === "" || tags.includes(searchText.trim()),
					onAction: () => handleTagAdd(searchText.trim())
				}}
				allowMultiple
				listTitle="Suggested tags"
				options={options}
				selected={value}
				onSelect={onChange}
				textField={
					<Autocomplete.TextField
						loading={loading}
						placeholder="Search tags"
						prefix={<Icon source={SearchIcon} />}
						value={searchText}
						onChange={setSearchText}
					/>
				}
			/>
			<InlineStack blockAlign="center" gap="200">
				{value.map(function (tag) {
					const removeTag = () => handleTagRemove(tag);
					return (
						<Tag onRemove={removeTag} key={tag}>
							{tag}
						</Tag>
					);
				})}
			</InlineStack>
		</BlockStack>
	);
}

TagPicker.propTypes = {
	type: PropTypes.oneOf(["product", "customer"]),
	value: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func
};
